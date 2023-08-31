<template>
  <DashboardSection
      title="Pizza"
      @click.stop="closeDropdown"
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
      <div class="pizza__content__data" @click.stop>
        <Select
            ref="dropdownComponent"
            label="Choose a size"
            select-name="pizzaSizes"
            :options="sizeOptions"
            @input="setSize"
        />
        <AddButton
            @proceedAddition="addBrandNewSize"
        >
          Add new size
        </AddButton>
        <!-- Todo: create a component for opting prices and sizes -->
      </div>
      <div v-if="pizzaModel.itemSizes.length" class="pizza__content__data">
        <SizeAndPrice
            label="Set price"
            :sizes="pizzaModel.itemSizes"
            @confirm="setPrice"
            @remove="removeSizeAndPrice"
        />
      </div>
      <div class="pizza__content__data">
        <!-- Todo: create a component for nutrition object -->
      </div>
      <!-- Todo: add a section for showing existed pizzas list
            and modal popup with the same AddPizza component but with existed pizza's data in order to redact it -->
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

  const dashboardStore = useDashboardStore()
  const config = useRuntimeConfig()
  const pizzaModel = reactive<IPizzaModel>({
    name: '',
    img: null,
    pastryTypes: [],
    itemPrices: [],
    itemSizes: [],
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
        label: `${size.value} cm`,
        value: size.value
      }
    })
  })
  const addBrandNewSize = () => {

  }
  const setSize = (size: number) => {
    if (!pizzaModel.itemSizes?.includes(size)) {
      pizzaModel.itemSizes.push(size)
    }
  }
  const setPrice = (data: {index: number, price: number}) => {
    pizzaModel.itemPrices[data.index] = data.price;
  }
  const removeSizeAndPrice = (index: number) => {
    pizzaModel.itemSizes = pizzaModel.itemSizes.filter((size, ind) => ind !== index)
  }
  const dropdownComponent = ref(null)

  const closeDropdown = () => {
    dropdownComponent.value.closeDropdown()
  }
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
    }
  }


</style>