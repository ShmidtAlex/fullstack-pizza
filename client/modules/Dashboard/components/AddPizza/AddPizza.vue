<template>
  <DashboardSection title="Pizza" :is-loading="pizzaCreating">
    <div class="pizza__content">
      <div class="pizza__content__image">
        <!--        Todo: if we left as is, after reloading page image won't be sent to server,
              and after changes, data type is still not appropriate but still visible on the page -->
        <label for="uploadImage" @change="uploadImage">
          <input id="uploadImage" ref="uploadInput" type="file" name="image" />
        </label>
        <img
          v-if="src"
          :src="src"
          alt="Opted image for created or redacted pizza"
          @click="replaceImage"
        />
        <div v-if="!src" class="tip">download image</div>
      </div>
      <div class="pizza__content__data">
        <!--        TODO: resolve values in two inputs below do not update after removal -->
        <BaseInput
          id="pizza-name"
          v-model="pizzaModel.name"
          label="Name"
          placeholder="Enter pizza name"
          type="text"
        />
        <BaseInput
          id="pizza-description"
          v-model="pizzaModel.description"
          label="Description"
          placeholder="Enter description"
          type="text"
        />
      </div>
      <!--      -->
      <div class="pizza__content__data">
        <BaseButton
          :type="isSizeAndPriceSet"
          @proceed-action="isSizesAndPricesModal = true"
          >Set Sizes and Prices</BaseButton
        >
        <div v-if="sizeAndPriceConditions" class="pizza__content__data__result">
          <div class="pizza__content__data__result__label">
            Opted sizes and prices
          </div>
          <div
            v-for="itemSize in pizzaModel.itemSizes"
            :key="itemSize.id"
            class="pizza__content__data__result_item"
          >
            {{ itemSize.value }} cm {{ showSizePrice(itemSize.id) }} $
          </div>
        </div>
        <ModalContainer
          v-if="isSizesAndPricesModal"
          title="Set price for each size"
          :is-footer="false"
          @close="closeSizesAndPricesModal"
          @click="closeDropdown"
        >
          <div class="modal__content">
            <BaseSelect
              ref="dropdownComponent"
              label="Choose a size"
              select-name="pizzaSizes"
              :options="sizeOptions"
              @input="setSize"
              @click.stop
            />
            <div class="modal__content__settings">
              <SizeAndPrice
                v-if="pizzaModel.itemSizes.length"
                label="Set price"
                :sizes="pizzaModel.itemSizes"
                :prices="pizzaModel.itemPrices"
                @confirm="setPrice"
                @remove="removeSizeAndPrice"
                @reset="resetOnlyPrice"
              />
            </div>
          </div>
          <BaseButton
            type="success"
            :disabled="!sizeAndPriceConditions"
            @proceed-action="showSizeAndPriceResult"
            >Apply</BaseButton
          >
        </ModalContainer>
      </div>
      <!--  Todo: this block should be shown in pizza's redact mode as we only able to add size to existed pizza -->
      <!--      <div  class="pizza__content__data">-->
      <!--        <div class="modal__content">-->
      <!--          <div v-if="sizeCreationMode" class="pizza__content__data&#45;&#45;addition">-->
      <!--            <BaseInput type="text" v-model="newSize" placeholder="add brand new size" />-->
      <!--            <div class="pizza__content__data&#45;&#45;off">-->
      <!--              <AddButton :disabled="!newSize" @proceed="addBrandNewSize">Create</AddButton>-->
      <!--              <RemoveButton @close="sizeCreationMode = false"/>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--          <AddButton v-if="!sizeCreationMode" @proceed="turnOnCreationMode">Add new size</AddButton>-->
      <!--        </div>-->
      <!--      </div>-->
      <div class="pizza__content__data">
        <BaseButton
          :type="allNutrition"
          @proceed-action="isNutritionModal = true"
          >Set nutrition</BaseButton
        >
        <div v-if="isNutritionSet" class="pizza__content__data__result">
          <div class="pizza__content__data__result__label">
            Opted nutrition g
          </div>
          <div
            v-for="(nutritionItem, key) in pizzaModel.nutrition"
            :key="key"
            class="pizza__content__data__result_item"
          >
            {{ key }}: {{ nutritionItem }}
          </div>
        </div>
        <ModalContainer
          v-if="isNutritionModal"
          title="Set nutrition details"
          :is-footer="false"
          @close="closeNutritionModal"
        >
          <div class="modal__content">
            <BaseInput
              id="protein"
              v-model="pizzaModel.nutrition.protein"
              label="Proteins:"
              type="number"
              placeholder="enter protein amount"
            />
            <BaseInput
              id="fats"
              v-model="pizzaModel.nutrition.fats"
              label="Fats:"
              type="number"
              placeholder="enter fats amount"
            />
            <BaseInput
              id="carbohydrates"
              v-model="pizzaModel.nutrition.carbohydrates"
              label="Carbohydrates:"
              type="number"
              placeholder="enter carbohydrates amount"
            />
            <BaseInput
              id="energy"
              v-model="pizzaModel.nutrition.energy"
              label="Energy:"
              type="number"
              placeholder="enter energy amount"
            />
          </div>

          <BaseButton
            type="success"
            :disabled="!isNutritionSet"
            @proceed-action="isNutritionModal = false"
            >Apply</BaseButton
          >
        </ModalContainer>
      </div>
      <div class="pizza__content__data">
        <BaseButton
          :type="pastryTypeCondition"
          @proceed-action="isPastryTypesModal = true"
          >Set Pastry Types</BaseButton
        >
        <div v-if="isPastryTypesSet" class="pizza__content__data__result">
          <div class="pizza__content__data__result__label">
            Opted pastry types
          </div>
          <div
            v-for="type in pizzaModel.pastryTypes"
            :key="type"
            class="pizza__content__data__result_item"
          >
            {{ type }}
          </div>
        </div>
        <ModalContainer
          v-if="isPastryTypesModal"
          title="Set Pastry Types"
          :is-footer="false"
          @close="closePastryTypesModal"
        >
          <div class="modal__content">
            <Toggler value="Thin" data-type="string" @toggle="changeType" />
            <Toggler
              value="Traditional"
              data-type="string"
              @toggle="changeType"
            />
          </div>
          <BaseButton
            type="success"
            :disabled="!isPastryTypesSet"
            @proceed-action="isPastryTypesModal = false"
            >Apply</BaseButton
          >
        </ModalContainer>
      </div>
      <ItemsList
        title="Ingredients available for addition"
        :expand="showList"
        @toggle-list="showList = !showList"
      >
        <template v-if="ingredients.length">
          <DPizzaIngredient
            v-for="ingredient in ingredients"
            :key="ingredient.id"
            :data="ingredient"
            selection-mode
            @select="addIngredient"
          />
        </template>
        <template v-else>
          <EmptyData item-name="ingredients" />
        </template>
      </ItemsList>
      <!-- Todo: add a section for showing existed pizzas list
            and modal popup with the same AddPizza component but with existed pizza's data in order to redact it -->
      <div class="pizza__content__data">
        <AddButton :disabled="!allFieldsFullFelt" @proceed="proceed"
          >Create Pizza</AddButton
        >
      </div>
    </div>
  </DashboardSection>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import SizeAndPrice from "../SizeAndPrice/SizeAndPrice.vue";
import { TButtonsTypes } from "~/components/BaseButton/BaseButton.vue";
import Toggler from "~/components/ValueToggler/ValueToggler.vue";
import { useRuntimeConfig } from "#app";
import { useDashboardStore } from "~/modules/Dashboard/store/DashbordStore";
import { IPizzaModel } from "~/modules/Dashboard/types";
import AddButton from "~/components/AddButton/AddButton.vue";
import BaseInput from "~/components/BaseInput/BaseInput.vue";
import RemoveButton from "~/components/RemoveButton/RemoveButton.vue";
import { IOptions, TTogglerDataTypes } from "~/components/types";
import { pushOrFilter } from "~/helpers";
import EmptyData from "~/components/EmptyDataPlug/EmptyData.vue";
import BaseButton from "~/components/BaseButton/BaseButton.vue";
import ModalContainer from "~/components/ModalContainer/ModalContainer.vue";
import ItemsList from "~/components/ItemsList/ItemsList.vue";
import DPizzaIngredient from "../DPizzaIngredient/DPizzaIngredient.vue"

const { ingredients } = storeToRefs(useDashboardStore());
const dashboardStore = useDashboardStore();
const config = useRuntimeConfig();
const pizzaModel = reactive<IPizzaModel>({
  name: "",
  img: null,
  pastryTypes: [],
  itemPrices: [],
  itemSizes: [],
  ingredientsIds: [],
  description: "",
  nutrition: {
    protein: 0,
    fats: 0,
    carbohydrates: 0,
    energy: 0,
  },
});
// const emit = defineEmits(["upload"]);

onMounted(async () => {
  const preloadedImage = localStorage.getItem("preloadedImage");
  if (preloadedImage) {
    dashboardStore.setPreloadedImage(preloadedImage);
    const response = await dashboardStore.fetchPreloadedImage(preloadedImage);
    const blob = new Blob([response], { type: "image/png" });
    const serverFile = new File([blob], preloadedImage, { type: blob.type });
    pizzaModel.img = serverFile;
  }
  dashboardStore.fetchPizzaSizes();
});
// IMAGE MANAGEMENT
const uploadInput = ref(null);
const src = computed((): string => {
  if (dashboardStore.uploadedImgSrc) {
    return `${config.public.NUXT_ENV_BASE_URL}${dashboardStore.uploadedImgSrc}`;
  }
  return "";
});

const uploadImage = (event: any): void => {
  const file = event.target.files;
  if (file) {
    dashboardStore.preUploadImage(file[0]);
    pizzaModel.img = file[0];
  }
};

const replaceImage = () => {
  uploadInput.value.click();
};

// PIZZA CREATION
const pizzaCreating = computed(() => {
  return dashboardStore.pizzaAdditionLoader;
});

const proceed = async () => {
  await dashboardStore.createPizza(pizzaModel);
};

watch(pizzaCreating, (newValue) => {
  if (newValue === false) {
    clearData();
  }
});

// PRICES AND SIZES
const sizeOptions = computed(() => {
  return dashboardStore.sizes.map((size) => {
    return {
      id: size.id,
      label: `${size.value} cm`,
      value: size.value,
    };
  });
});

const isSizesAndPricesModal = ref<boolean>(false);
const closeSizesAndPricesModal = () => {
  isSizesAndPricesModal.value = false;
  clearSizesAndPricesData();
};

const showSizeAndPriceResult = () => {
  isSizesAndPricesModal.value = false;
};

const clearSizesAndPricesData = () => {
  pizzaModel.itemSizes = [];
  pizzaModel.itemPrices = [];
};

const sizeAndPriceConditions = computed((): boolean => {
  return (
    pizzaModel.itemPrices.length > 0 &&
    pizzaModel.itemPrices.every((item) => !!item.value)
  );
});

const isSizeAndPriceSet = computed(() => {
  return sizeAndPriceConditions.value ? "success" : "warning";
});

const sizeCreationMode = ref<boolean>(false);
const newSize = ref<string>("");
const turnOnCreationMode = (): void => {
  sizeCreationMode.value = true;
};

const addBrandNewSize = (): void => {
  dashboardStore.createSize({ value: newSize.value });
};

const setSize = (size: IOptions): void => {
  const existedSize = pizzaModel.itemSizes.find(
    (elem) => elem.value === size.value
  );
  if (!existedSize) {
    pizzaModel.itemSizes.push(size);
    pizzaModel.itemPrices.push({ id: size.id, value: null });
  }
};

const setPrice = (data: { id: number; value: number }) => {
  const item = pizzaModel.itemPrices.find((item) => item.id === data.id);
  item.value = data.value;
};

const resetOnlyPrice = (id) => {
  const item = pizzaModel.itemPrices.find((item) => item.id === id);
  item.value = null;
};

const removeSizeAndPrice = (id: number) => {
  pizzaModel.itemSizes = pizzaModel.itemSizes.filter((el) => el.id !== id);
  pizzaModel.itemPrices = pizzaModel.itemPrices.filter((el) => el.id !== id);
};

const showSizePrice = (id: number) => {
  return pizzaModel.itemPrices.find((item) => item.id === id).value;
};

// INGREDIENTS
const addIngredient = (id: number) => {
  pushOrFilter(pizzaModel.ingredientsIds, id);
};

// NUTRITION
const isNutritionModal = ref<boolean>(false);
const isNutritionSet = computed((): boolean => {
  return Object.values(pizzaModel.nutrition).every((item) => item > 0);
});

const allNutrition = computed((): TButtonsTypes => {
  return isNutritionSet.value ? "success" : "warning";
});

const allFieldsFullFelt = computed((): boolean => {
  return (
    sizeAndPriceConditions.value &&
    isNutritionSet.value &&
    isPastryTypesSet.value &&
    !!pizzaModel.name &&
    !!pizzaModel.description &&
    pizzaModel.ingredientsIds.length > 0
  );
});

const closeNutritionModal = () => {
  isNutritionModal.value = false;
  clearNutritionData();
};

const clearNutritionData = () => {
  for (const key in pizzaModel.nutrition) {
    pizzaModel.nutrition[key] = 0;
  }
};

// PASTRY TYPES
const isPastryTypesModal = ref<boolean>(false);
const isPastryTypesSet = computed((): boolean => {
  return pizzaModel.pastryTypes.length > 0;
});

const pastryTypeCondition = computed((): TButtonsTypes => {
  return isPastryTypesSet.value ? "success" : "warning";
});

const closePastryTypesModal = () => {
  isPastryTypesModal.value = false;
  clearPastryTypes();
};

const changeType = (data: TTogglerDataTypes) => {
  if (typeof data === "string") {
    pushOrFilter(pizzaModel.pastryTypes, data);
  }
};

const clearPastryTypes = () => {
  pizzaModel.pastryTypes = [];
};

// OUTSIDE CLICK
const dropdownComponent = ref(null);
const closeDropdown = () => {
  if (dropdownComponent.value) {
    dropdownComponent.value.closeDropdown();
  }
};

const showList = ref(false);
// DATA CLEARING
const clearData = () => {
  localStorage.setItem("preloadedImage", "");
  dashboardStore.setPreloadedImage("");
  clearPastryTypes();
  clearNutritionData();
  clearSizesAndPricesData();
  pizzaModel.name = "";
  pizzaModel.description = "";
  pizzaModel.img = null;
  pizzaModel.ingredientsIds = [];
  showList.value = false;
};
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
      background-image: url("/default_pizza.svg");
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
    &__result {
      padding: 16px;
      &__label {
        font-weight: 500;
        margin-bottom: 8px;
      }
    }
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
