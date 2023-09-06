<template>
  <div class="pizza-unit">
    <div v-if="showAddons" class="pizza-unit__appeared-addons">
      <AddonsBlock
        :is-addons-shown="showAddons"
        :is-addon-elements-list-shown="addonElementsListShown"
        :addons="pizzaData.ingredients"
        :removed-and-applied-addons="finalObject.excludedIngredients"
        :opted-addons="finalObject.extraAddons"
        @change-ingredients-list="changeIngredientsList"
        @show-addon-elements-list="toggleAddonElementList"
        @show-addon="showAddonInUnit"
      />
    </div>
    <div class="pizza-unit__picture">
      <img
        class="pizza-unit__picture--img"
        :alt="pizzaData.name"
        :src="`${config.public.NUXT_ENV_BASE_URL}static/${pizzaData.img}`"
      />
      <ShowAddonsButton
        v-if="pizzaData.ingredients.length"
        @show-addon="showAddonInUnit"
      />
    </div>
    <div class="pizza-unit__information">
      <div class="pizza-unit__information--header">
        <div class="pizza-unit__information--header_name">
          {{ pizzaData.name }}
        </div>
        <button
          class="pizza-unit__information--header_nutrition-button"
          @click="showNutrition"
        >
          i
        </button>
      </div>
      <!--   Todo: should be hidden by default in mobile   -->
      <div class="pizza-unit__information--description">
        {{ pizzaData.description }}
      </div>
      <NutritionPopup
        :is-nutrition-shown="isNutritionShown"
        :nutrition="pizzaData.nutrition"
      />

      <div class="pizza-unit__information--options">
        <Slider
          :data="pizzaData.pastryTypes"
          :unit-key="typeKeyValue"
          @change-option="changeType"
        />
        <Slider
          :data="pizzaData.itemSizes"
          :unit-key="sizeKeyValue"
          unit-of-measure="cm"
          @change-option="changeSize"
        />
        <PizzaPrices
          :running-price="cTotalPrice"
          @add-pizza-to-cart="addPizzaToCart"
        />
      </div>
    </div>
    <div v-if="addonElementsListShown" class="pizza-unit__showed-addons-list">
      <AddonElementsList
        :addons-list="pizzaData.ingredients"
        :previously-opted="finalObject.extraAddons"
        @summarize-opted-addons="nestOptedAddons"
        @toggle-addons-list="toggleAddonElementList"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
// Todo: add unit-tests
import { computed, PropType, reactive, ref } from "vue";
import AddonsBlock from "../AddonsBlock/AddonsBlock.vue";
import AddonElementsList from "../AddonElementsList/AddonElementsList.vue";
import NutritionPopup from "../NutritionPopup/NutritionPopup.vue";
import PizzaPrices from "../PizzaPrices/PizzaPrices.vue";
import Slider from "../ProductSlider/ProductSlider.vue";
import ShowAddonsButton from "./ShowAddonsButton.vue";

import { useProductsStore } from "~/modules/Products/store/ProductsStore";

import {
  IAddonsDynamicObject,
  ICancelIngredients,
  IFinalObjectForCart,
  IPizzaData,
  IOptedAddons,
  IPizzaSubObjectUnit,
  ISliderOutput,
} from "~/modules/Products/types";
import { useRuntimeConfig } from "#app";

const { addToOrder } = useProductsStore();

const config = useRuntimeConfig();

const props = defineProps({
  pizzaData: {
    type: Object as PropType<IPizzaData>,
    required: true,
  },
});
const emits = defineEmits(["collapse-section"]);
const showAddons = ref<boolean>(false);
const addonElementsListShown = ref<boolean>(false);
const isNutritionShown = ref<boolean>(false);
const typeKeyValue = ref<number>(0);
const sizeKeyValue = ref<number>(0);
const priceKeyValue = ref<number>(0);

const finalObject = reactive<IFinalObjectForCart>({
  pizzaName: props.pizzaData?.name,
  pizzaSize: props.pizzaData?.itemSizes[0].value as number,
  pizzaType: props.pizzaData?.itemSizes[0].value as string,
  extraAddons: {},
  excludedIngredients: [],
  quantity: 1,
  totalPrice: 0,
  extraPrice: 0,
  smallImg: props.pizzaData.img,
});

const cTotalPrice = computed((): number | string => {
  return finalObject.extraPrice
    ? Number(props.pizzaData.prices[priceKeyValue.value].value) +
        finalObject.extraPrice
    : props.pizzaData.prices[priceKeyValue.value].value;
});

const showAddonInUnit = (): void => {
  showAddons.value = !showAddons.value;
};

const changeType = (value: ISliderOutput<string>) => {
  const { unitKey, unit } = value;
  typeKeyValue.value = unitKey;
  finalObject.pizzaType = unit;
};

const changeSize = (value: ISliderOutput<number>): void => {
  const { unitKey, unit } = value;
  sizeKeyValue.value = unitKey;
  priceKeyValue.value = unitKey;
  finalObject.pizzaSize = unit;
  changePrice(unitKey);
};

const showNutrition = (): void => {
  isNutritionShown.value = !isNutritionShown.value;
};

const changePrice = (sizeKey: number): void => {
  const obj = props.pizzaData.prices.find(
    (elem: IPizzaSubObjectUnit, index: number) => {
      return index === sizeKey;
    }
  );
  if (obj) {
    finalObject.totalPrice = (obj.value as number) + finalObject.extraPrice;
  }
};

const changeIngredientsList = (ingredients: ICancelIngredients): void => {
  finalObject.excludedIngredients = ingredients;
};

const toggleAddonElementList = () => {
  addonElementsListShown.value = !addonElementsListShown.value;
};

/** finalObject.extraAddons has to be an object,
 * because we are potentially going to use it
 * for removing/correcting right from the cart. */

const nestOptedAddons = (value: IOptedAddons[]): void => {
  value.forEach((elem) => {
    if (!Object.keys(finalObject.extraAddons).includes(elem.value)) {
      const { count, price } = elem;
      finalObject.extraAddons[elem.value as keyof IAddonsDynamicObject] = {
        count,
        price,
      };
    } else {
      finalObject.extraAddons[elem.value as keyof IAddonsDynamicObject].count +=
        elem.count;
    }
  });
  finalObject.extraPrice = Object.values(finalObject.extraAddons).reduce(
    (acc, elem) => {
      acc += elem.count * elem.price;
      return acc;
    },
    0
  );
  finalObject.totalPrice =
    finalObject.extraPrice +
    Number(props.pizzaData.prices[priceKeyValue.value].value);
};

/** resetting finalObject has to be only after making order
 * and not right after adding pizza to the cart */ // TODO: why?????

//    Todo: priority: high user able to save his/her favorite pizza settings

const addPizzaToCart = (): void => {
  // Todo: animating add to cart priority: high
  if (!finalObject.totalPrice) {
    finalObject.totalPrice = Number(cTotalPrice.value);
  }
  const serialized = JSON.parse(JSON.stringify(finalObject));
  serialized.id = Date.now();
  addToOrder(serialized);
  emits("collapse-section", true);
  finalObject.extraAddons = {};
  finalObject.excludedIngredients = [];
  finalObject.totalPrice = 0;
  finalObject.extraPrice = 0;
};
</script>
<style lang="scss">
button {
  outline: none;
}
.pizza-unit {
  width: 300px;
  min-height: fit-content;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
  &__picture {
    width: 100%;
    min-height: fit-content;
    background-size: cover;
    border: 2px solid white;
    border-radius: 5px;
    &--img {
      max-width: 100%;
      border-radius: 5px;
      position: relative;
    }
  }
  &__appeared-addons {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
  }
  &__information {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 90%;
    height: 266px;
    position: relative;
    &--options {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      margin: 0 0 20px 0;
    }
    &--header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      position: relative;
      width: 100%;
      &_nutrition-button {
        position: absolute;
        top: -5px;
        right: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border: 1px solid;
        border-radius: 25px;
        &:active {
          background-color: rgba(255, 255, 255, 0);
        }
      }
      &_name {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap;
        font-family: Helvetica, sans-serif;
        font-weight: 700;
        color: #70544f;
        line-height: 1.33;
        text-align: left;
        font-size: 18px;
      }
    }
    &--description {
      text-align: left;
      color: #a69895;
      font-size: 13px;
      min-height: 80px;
    }
  }
  &__showed-addons-list {
    display: flex;
    z-index: 5;
  }
}
</style>
