<template>
  <div
    class="nutrition-popup"
    :class="{ 'nutrition-shown': props.isNutritionShown }"
  >
    <div class="nutrition-popup__title">
      <h4>Nutrition information per 100g</h4>
    </div>
    <div class="nutrition-popup__item">
      <span>protein: </span><span>{{ props.nutrition.protein }}</span>
    </div>
    <div class="nutrition-popup__item">
      <span>fats:</span> <span>{{ props.nutrition.fats }}</span>
    </div>
    <div class="nutrition-popup__item">
      <span>carbohydrates:</span>
      <span>{{ props.nutrition.carbohydrates }}</span>
    </div>
    <div class="nutrition-popup__item">
      <span>energy:</span>
      <span
        >{{ props.nutrition.energy[0] }}/{{ props.nutrition.energy[1] }}</span
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { INutrition } from "~/modules/Products/types";

const props = defineProps({
  isNutritionShown: {
    type: Boolean,
    default: false,
  },
  nutrition: {
    type: Object as PropType<INutrition>,
    default: () => {},
  },
});
</script>

<style lang="scss" scoped>
.nutrition-popup {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  bottom: 100%;
  left: -13px;
  width: 248px;
  height: 200px;
  padding: 16px;
  margin-bottom: 13px;
  border-radius: 6px;
  background-color: #70544f;
  color: #fff;
  z-index: 2;
  opacity: 0;
  -webkit-transition: opacity 0.175s;
  transition: opacity 0.175s;

  &__item {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  &__title {
    @extend .nutrition-popup__item;
    margin: 0 0 15px 0;
  }
}
.nutrition-shown {
  opacity: 1;
}
</style>
