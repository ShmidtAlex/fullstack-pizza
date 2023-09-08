<template>
  <div class="addon-wrapper" :class="{ 'addon-wrapper--appear': isAppear }">
    <div class="addon-elements" :class="{ 'addon-elements--appear': isAppear }">
      <div class="addon-elements__header">
        <div class="addon-elements__header--title">
          <h4>
            Opt
            <span :class="{ 'warn-text': isWarn }">maximum 2 for each</span>
            addon
          </h4>
        </div>
        <CloseButton @close="closeAddons" />
      </div>
      <div class="addon-elements__body">
        <div class="addon-elements__body--container">
          <AddonElement
            v-for="addon in addonsList"
            :key="addon.id"
            :available-addon="addon"
            :previously-opted="previouslyOpted[addon.value]"
            @change-price="changePrice"
            @amount-warning="warnAboutNumbers"
          />
        </div>
      </div>
      <div class="addon-elements__footer">
        <div class="addon-elements__footer--title">
          Total price for all addons:
        </div>
        <div class="addon-elements__footer--price">
          {{ cPriceConsideringPrevious }} $
        </div>
      </div>
      <button class="addon-elements__footer--apply" @click="applyAddons">
        Apply
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
// Todo: add tests
import { onMounted, PropType, ref } from "vue";
import CloseButton from "../CloseButton/CloseButton.vue";
import AddonElement from "./AddonElement.vue";
import { IPizzaSubObjectsArray, IOptedAddons } from "~/modules/Products/types";

const props = defineProps({
  addonsList: {
    type: Object as PropType<IPizzaSubObjectsArray>,
    required: true,
  },
  previouslyOpted: {
    type: Object,
    required: true
  },
});
const optedAddons = ref<Array<IOptedAddons>>([]);
const totalAddonPrice = ref<number>(0);
const isWarn = ref<boolean>(false);
const isAppear = ref<boolean>(false);

onMounted(() => {
  setTimeout(() => {
    isAppear.value = true;
  }, 100);
});
const emit = defineEmits(["toggleAddonsList", "summarizeOptedAddons"]);

const closeAddons = (): void => {
  isAppear.value = false;
  emit("toggleAddonsList", false);
};

const changePrice = (obj: IOptedAddons): void => {
  const existed = optedAddons.value.find((elem) => elem.value === obj.value);
  if (!existed) {
    optedAddons.value.push(obj);
  } else {
    existed.count = obj.count;
  }
  countAddonPrice();
};

const countPreviousPrice = (): number => {
  let result = 0;
  for (const key in props.previouslyOpted) {
    result +=
      props.previouslyOpted[key].price * props.previouslyOpted[key].count;
  }
  return result;
};

const countAddonPrice = (): void => {
  totalAddonPrice.value = optedAddons.value
    .map((elem) => elem.count * elem.price)
    .reduce((acc, elem) => acc + elem);
};

const cPriceConsideringPrevious = computed((): number => {
  return Object.entries(props.previouslyOpted).length
    ? countPreviousPrice() + totalAddonPrice.value
    : totalAddonPrice.value;
});

const warnAboutNumbers = (): void => {
  isWarn.value = true;
  setTimeout(() => {
    isWarn.value = false;
  }, 1500);
};

const applyAddons = (): void => {
  emit("summarizeOptedAddons", optedAddons.value);
  closeAddons();
};
</script>

<style lang="scss" scoped>
@import "assets/css/animations/warn-text";
.addon-elements {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  opacity: 0;
  visibility: hidden;
  top: 20%;
  left: 25%;
  width: 600px;
  height: 600px;
  max-width: 100vw;
  background-color: white;
  box-shadow: 10px 10px 10px 10px rgba(100, 100, 100, 0.5);
  border-radius: 5px;
  transition: opacity 500ms ease-in-out;
  &--appear {
    opacity: 1;
    visibility: visible;
  }
  &__header {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    &--title {
      width: 60%;
      display: flex;
      flex-direction: column;
      color: #70544f;
      align-items: flex-start;
      margin: 10px 0 0 40px;
      font-size: 22px;
    }
  }
  &__body {
    width: 100%;
    height: 422px;
    min-height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &--container {
      width: 90%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 30px 0;
    }
  }
  &__footer {
    display: flex;
    justify-content: flex-start;
    width: 95%;
    margin: 0 0 0 20px;
    font-size: 22px;
    &--title {
      margin: 0 10px 0 40px;
    }
    &--apply {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 48px;
      padding: 15px 25px;
      border-radius: 23px;
      background-color: #009471;
      border: none;
      color: #fff;
      font-family: Helvetica, serif;
      font-weight: 700;
      text-align: center;
      text-transform: uppercase;
      cursor: pointer;
      margin: 20px;
      font-size: 16px;
      outline: none;
    }
  }
}
.warn-text {
  font-size: 22px;
  color: #70544f;
  animation-name: warn-text;
  animation-duration: 1.5s;
}
.addon-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  z-index: 4;
  transition-delay: 500ms;
  transition: all 500ms ease-in-out;
  &--appear {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.3);
  }
}
@media screen and (max-width: 540px) {
  .addon-elements {
    left: 0;
  }
}
</style>
