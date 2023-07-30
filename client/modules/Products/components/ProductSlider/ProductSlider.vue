<template>
  <div ref="parentElem" class="slider">
    <div
      v-for="(unit, index) in data"
      :key="unit.id"
      :class="{
        slider__type: index !== unitKey,
        'slider__type-active': index === unitKey,
      }"
      @click="changeOption(index, unit.value)"
    >
      <span
        :class="{
          'slider__type-active--text': index === unitKey,
          'slider__type--text': index !== unitKey,
        }"
        >{{ unit.value }} {{ unitOfMeasure }}</span
      >
    </div>
    <div ref="fullSlider" class="slider__body"></div>
  </div>
</template>

<script lang="ts" setup>
// Todo: add unit tests
import { PropType } from "vue";
import { IPizzaSubObjectsArray } from "~/modules/Products/types";
const props = defineProps({
  data: {
    type: Array as PropType<IPizzaSubObjectsArray[]>,
    required: true, // this helps to avoid TS2532: Object is possibly 'undefined'.
  },
  sliderElementWidth: {
    type: String,
    default: "270px",
  },
  unitKey: {
    type: Number,
    default: 0,
  },
  unitOfMeasure: {
    type: String,
    default: "",
  },
});
const fullSlider = ref(null);
const parentElem = ref(null);

const emit = defineEmits(["changeOption"]);
const changeOption = (index: number, unit: number): void => {
  changeSliderPosition(index);
  emit("changeOption", { unitKey: index, unit });
};

const sliderBody = computed((): string => {
  return `${
    Number(props.sliderElementWidth?.slice(0, -2)) / props.data.length
  }px`;
});

const sliderBodyLeft = ref<string>("0px");

const measureSliderStep = (): number | void => {
  let sumOfBorders: number;
  if (parentElem?.value) {
    sumOfBorders =
      Number(
        window.getComputedStyle(parentElem?.value).borderWidth.slice(0, -2)
      ) * 2;
    return (
      (Number(props.sliderElementWidth?.slice(0, -2)) - sumOfBorders) /
      props.data.length
    );
  }
};

const changeSliderPosition = (elemIndex: number): void => {
  const sliderStep: number | unknown = measureSliderStep();
  if (sliderStep) {
    sliderBodyLeft.value = `${elemIndex * Number(sliderStep)}px`;
  }
};
</script>

<style lang="scss" scoped>
.flex-row-centered {
  display: flex;
  justify-content: center;
  align-items: center;
}
.slider {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: v-bind(sliderElementWidth);
  height: 36px;
  margin: 3px;
  border-radius: 100px;
  border: 1px solid #ededed;
  cursor: pointer;
  &__body {
    position: absolute;
    left: v-bind(sliderBodyLeft);
    width: v-bind(sliderBody);
    height: 36px;
    border-radius: 30px;
    color: #191312;
    background-color: rgba(118, 118, 118, 0.15);
    transition: left 400ms ease-in-out;
    cursor: pointer;
  }
  &__type-active {
    @extend .flex-row-centered;
    position: relative;
    width: v-bind(sliderBody);
    height: 36px;
    border-radius: 30px;
    cursor: pointer;
    &--text {
      position: absolute;
      color: #70544f;
      transition: all 0.8s linear;
    }
  }
  &__type {
    @extend .flex-row-centered;
    width: v-bind(sliderBody);
    height: 100%;
    cursor: pointer;
    border-radius: 30px;
    &--text {
      position: absolute;
      color: #a69895;
    }
  }
}
</style>
