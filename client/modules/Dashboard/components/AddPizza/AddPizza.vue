<template>
  <DashboardSection
      title="Pizza"
  >
    <div class="pizza__content" >
      <div class="pizza__content__image">
        <label for="uploadImage" @change="uploadImage">
          <input
              ref="uploadInput"
              type="file"
              name="image"
              id="uploadImage"
          />
        </label>
        <img
            v-if="src"
            :src="src"
            alt="Opted image for created or redacted pizza"
            @click="replaceImage"
        >
        <div v-if="!src" class="tip">download image</div>
      </div>
      <div class="pizza__content__data">
        <Input
            v-model="pizzaModel.name"
            id="pizza-name"
            label="Name"
            placeholder="Enter pizza name"
            type="text"
        />
        <Input
            v-model="pizzaModel.description"
            id="pizza-description"
            label="Description"
            placeholder="Enter description"
            type="text"
        />
      </div>
      <div class="pizza__content__data" @click.stop="closeDropdown">
        <Button :type="isSizeAndPriceSet" @proceedAction="isSizesAndPricesModal = true">Set Sizes and Prices</Button>
        <Modal
            v-if="isSizesAndPricesModal"
            title="Set price for each size"
            :is-footer="false"
            @close="closeSizesAndPricesModal"
        >
          <div class="modal__content">
            <Select
                ref="dropdownComponent"
                label="Choose a size"
                select-name="pizzaSizes"
                :options="sizeOptions"
                @input="setSize"
            />
            <div class="modal__content__settings">
              <SizeAndPrice
                  v-if="pizzaModel.itemSizes.length"
                  label="Set price"
                  :sizes="pizzaModel.itemSizes"
                  @confirm="setPrice"
                  @remove="removeSizeAndPrice"
              />
            </div>
          </div>
          <Button
              type="success"
              :disabled="!sizeAndPriceConditions"
              @proceedAction="isSizesAndPricesModal = false"
          >Apply</Button>
        </Modal>
      </div>
      <!--  Todo: this block should be shown in pizza's redact mode as we only able to add size to existed pizza -->
<!--      <div  class="pizza__content__data">-->
<!--        <div class="modal__content">-->
<!--          <div v-if="sizeCreationMode" class="pizza__content__data&#45;&#45;addition">-->
<!--            <Input type="text" v-model="newSize" placeholder="add brand new size" />-->
<!--            <div class="pizza__content__data&#45;&#45;off">-->
<!--              <AddButton :disabled="!newSize" @proceed="addBrandNewSize">Create</AddButton>-->
<!--              <RemoveButton @close="sizeCreationMode = false"/>-->
<!--            </div>-->
<!--          </div>-->
<!--          <AddButton v-if="!sizeCreationMode" @proceed="turnOnCreationMode">Add new size</AddButton>-->
<!--        </div>-->
<!--      </div>-->
      <div class="pizza__content__data">
        <Button :type="allNutrition" @proceedAction="isNutritionModal = true">Set nutrition</Button>
        <Modal
            v-if="isNutritionModal"
            title="Set nutrition details"
            :is-footer="false"
            @close="closeNutritionModal"
        >
          <div class="modal__content">
            <Input v-model="pizzaModel.nutrition.protein" id="protein" label="Proteins:" type="number" placeholder="enter protein amount" />
            <Input v-model="pizzaModel.nutrition.fats" id="fats" label="Fats:" type="number" placeholder="enter fats amount" />
            <Input v-model="pizzaModel.nutrition.carbohydrates" id="carbohydrates" label="Carbohydrates:" type="number" placeholder="enter carbohydrates amount" />
            <Input v-model="pizzaModel.nutrition.energy" id="energy" label="Energy:" type="number" placeholder="enter energy amount" />
          </div>

          <Button
              type="success"
              :disabled="!isNutritionSet"
              @proceedAction="isNutritionModal = false"
          >Apply</Button>
        </Modal>
      </div>
      <div class="pizza__content__data">
        <Button :type="pastryTypeCondition" @proceedAction="isPastryTypesModal = true">Set Pastry Types</Button>
        <Modal
            v-if="isPastryTypesModal"
            title="Set Pastry Types"
            :is-footer="false"
            @close="closePastryTypesModal"
        >
          <div class="modal__content">
            <Toggler value="Thin" data-type="string" @toggle="changeType" />
            <Toggler value="Traditional" data-type="string" @toggle="changeType"/>
          </div>
          <Button
              type="success"
              :disabled="!isPastryTypesSet"
              @proceedAction="isPastryTypesModal = false"
          >Apply</Button>
        </Modal>

      </div>
      <List
          title="Show ingredients available for addition"
          :expand="showList"
          @toggleList="showList = !showList"
      >
        <template v-if="ingredients.length">
          <Ingredient
              v-for="ingredient in ingredients"
              :key="ingredient.id"
              :data="ingredient"
              selection-mode
              @select="addIngredient"
          />
        </template>
        <template v-else>
          <EmptyData
              item-name="ingredients"
          />
        </template>
      </List>
      <!-- Todo: add a section for showing existed pizzas list
            and modal popup with the same AddPizza component but with existed pizza's data in order to redact it -->
      <div class="pizza__content__data">
        <AddButton :disabled="!allFieldsFullFelt">Create Pizza</AddButton>
      </div>

    </div>
  </DashboardSection>
</template>

<script lang="ts" setup>
  import {useRuntimeConfig} from "#app";
  import {computed, onMounted, reactive, ref} from "vue";
  import {useDashboardStore} from "~/modules/Dashboard/store/DashbordStore";
  import {IPizzaModel} from "~/modules/Dashboard/types";
  import AddButton from "~/components/AddButton/AddButton.vue";
  import SizeAndPrice from "../SizeAndPrice/SizeAndPrice.vue";
  import Input from "~/components/Input/Input.vue";
  import RemoveButton from "~/components/RemoveButton/RemoveButton.vue";
  import {IOptions, TTogglerDataTypes} from "~/components/types";
  import Toggler from "~/components/Toggler/Toggler.vue";
  import {storeToRefs} from "pinia";
  import {pushOrFilter} from "~/helpers";
  import EmptyData from "~/components/EmptyDataPlug/EmptyData.vue";
  import Button from "~/components/Button/Button.vue";
  import Modal from "~/components/Modal/Modal.vue";

  const { ingredients } = storeToRefs(useDashboardStore());
  const dashboardStore = useDashboardStore()
  const config = useRuntimeConfig()
  const pizzaModel = reactive<IPizzaModel>({
    name: '',
    img: null,
    pastryTypes: [],
    itemPrices: [],
    itemSizes: [],
    ingredientIds: [],
    description: '',
    nutrition: {
      protein: 0,
      fats: 0,
      carbohydrates: 0,
      energy: 0,
    },
  })
  const emit = defineEmits(['upload'])
  onMounted(() => {
    const preloadedImage = localStorage.getItem('preloadedImage')
    if (preloadedImage) {
      dashboardStore.setPreloadedImage(preloadedImage);
    }
    dashboardStore.fetchPizzaSizes()
    // Todo: current implementation doesn't suppose that preloaded file itself is kept while reloading
  })
  const uploadInput = ref(null);
  const src = computed((): string => {
    if (dashboardStore.uploadedImgSrc) {
      return `${config.public.NUXT_ENV_BASE_URL}${dashboardStore.uploadedImgSrc}`
    }
    return ''
  })
  const uploadImage = (event: any): void => {
    const file = event.target.files
    if (file) {
      dashboardStore.preUploadImage(file[0])
      pizzaModel.img = file[0]
    }
  }
  const replaceImage = () => {
    uploadInput.value.click();
  }
  const proceed = () => {

    clearData()
  }
  const sizeOptions = computed(() => {
    return dashboardStore.sizes.map((size) => {
      return {
        id: size.id,
        label: `${size.value} cm`,
        value: size.value
      }
    })
  })
  const isSizesAndPricesModal = ref<boolean>(false);
  const closeSizesAndPricesModal = () => {
    isSizesAndPricesModal.value = false
    clearSizesAndPricesData()
  }
  const clearSizesAndPricesData = () => {
    pizzaModel.itemSizes = []
    pizzaModel.itemPrices = []
  }
  const sizeAndPriceConditions = computed((): boolean => {
    return pizzaModel.itemSizes.length === pizzaModel.itemPrices.length && pizzaModel.itemSizes.length > 0
  })
  const isSizeAndPriceSet = computed(() => {
    return sizeAndPriceConditions.value ? 'success' : 'warning'
  })
  const sizeCreationMode = ref<boolean>(false)
  const newSize = ref<string>('')
  const turnOnCreationMode = ():void => {
    sizeCreationMode.value = true
  }
  const addBrandNewSize = ():void => {
    dashboardStore.createSize({ value: newSize.value })
  }

  const setSize = (size: IOptions):void => {
    const existedSize = pizzaModel.itemSizes.find((elem) => elem.value === size.value)
    if (!existedSize) {
      pizzaModel.itemSizes.push(size)
    }
  }
  const setPrice = (data: {id: number, price: number}) => {
    pizzaModel.itemPrices[data.id-1] = data;
  }
  // method works incorrect because of index is a key, itemPrices and itemSizes has to be an object wi
  const removeSizeAndPrice = (id: number) => {
    pizzaModel.itemPrices = pizzaModel.itemPrices.filter((el, ind) => {
      return ind !== (id -1)
    })
    pizzaModel.itemSizes = pizzaModel.itemSizes.filter((el, ind) =>  ind !== (id -1))
  }
  const changeType = (data: TTogglerDataTypes) => {
    if (typeof data === 'string') {
      pushOrFilter(pizzaModel.pastryTypes, data)
    }
  }
  const addIngredient = (id: number) => {
    pushOrFilter(pizzaModel.ingredientIds, id)
  }
  const isNutritionModal = ref<boolean>(false)
  const isNutritionSet = computed(():boolean => {
    return Object.values(pizzaModel.nutrition).every((item) => item > 0)
  })
  const allNutrition = computed((): string  => {
    return isNutritionSet.value ? 'success' : 'warning'
  })
  const allFieldsFullFelt = computed((): boolean => {
    return sizeAndPriceConditions.value
  })
  const closeNutritionModal = () => {
    isNutritionModal.value = false
    clearNutritionData()
  }
  const clearNutritionData = () => {
    for (let key in pizzaModel.nutrition) {
      pizzaModel.nutrition[key] = 0
    }
  }
  const isPastryTypesModal = ref<boolean>(false)
  const isPastryTypesSet = computed((): boolean => {
    return pizzaModel.pastryTypes.length > 0
  })
  const pastryTypeCondition = computed((): string => {
    return isPastryTypesSet.value ? 'success' : 'warning'
  })
  const closePastryTypesModal = () => {
    isPastryTypesModal.value = false
    clearPastryTypes()
  }
  const clearPastryTypes = () => {
    pizzaModel.pastryTypes = []
  }
  const dropdownComponent = ref(null)

  const closeDropdown = () => {
    dropdownComponent.value.closeDropdown()
  }

  const showList = ref(false)
  const clearData = () => {
    localStorage.setItem('preloadedImage', '')
    // Todo: clear uploads folder after adding or redaction a new pizza
  }
  // Todo: add method for getting sizes list. for the option component where
  // Todo: each size in that component should have a pair price option
</script>

<style lang="scss" scoped>
  .pizza__content {
    display: flex;
    flex-wrap: wrap;
    &__image {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      position: relative;
      cursor: pointer;
      width: 108px;
      height: 108px;
      margin: 30px 16px;
      label {
        width: 100%;
        height: 100%;
        border: 2px solid #d3d3d3;
        background-image: url("/public/default_pizza.svg");
        background-size: 70px;
        background-repeat: no-repeat;
        background-position: 8px 20px;
        padding: 24px 8px 8px 8px;
        border-radius: 4px;
        overflow: hidden;
        cursor: pointer;
        input {
          visibility: hidden;
        }
      }
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 4px;
        box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.3);
        &:hover {
          box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.3);
        }
      }
      .tip {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        position: absolute;
        top: 4px;
        font-size: 10px;
        font-weight: 800;
        color: #d3d3d3;
        width: 100%;
      }
    }
    &__data {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: 0px 16px 16px;
      min-width: fit-content;
      margin-bottom: 16px;
      &--off {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        &:deep .add-button {
          margin-bottom: 0px;
        }
      }
    }
  }
  .modal__content {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    min-height: 48px;
    height: fit-content;
    width: 100%;
    margin: 16px 0px;
    &__settings {
      display: flex;
      flex-direction: column;
      justify-content: stretch;
      align-items: flex-start;
      width: 100%;
      height: fit-content;
    }
  }


</style>