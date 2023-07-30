<template>
  <div v-if="isAddonsShown" class="addons-block" @click.self="closeAddons">
    <div class="addons-block__unit">
      <div class="addons-block__unit--header">Removable ingredients</div>
      <AddonBlockItem
        v-for="addon in addons"
        :key="addon.id"
        :addon="addon"
        :removed-ingredients="combinedRemovements"
        @change-ingredient="changeIngredient"
      />
      <button class="addons-block__unit--add" @click="showAddonElementsList">
        <span>Add extras</span>
        <span class="addons-block__unit--add_i-plus">
          <svg
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 52 52"
            width="16px"
            height="16px"
            class=""
          >
            <g>
              <path
                d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M38.5,28H28v11c0,1.104-0.896,2-2,2  s-2-0.896-2-2V28H13.5c-1.104,0-2-0.896-2-2s0.896-2,2-2H24V14c0-1.104,0.896-2,2-2s2,0.896,2,2v10h10.5c1.104,0,2,0.896,2,2  S39.604,28,38.5,28z"
                data-original="#000000"
                class="active-path"
                data-old_color="#000000"
                fill="#009471"
              />
            </g>
          </svg>
        </span>
      </button>
      <hr />
      <div class="addons-block__unit--actions">
        <div class="addons-block__unit--actions_cansel">
          <button @click="canselChanges">Cansel</button>
        </div>
        <button
          class="addons-block__unit--actions_apply"
          :disabled="!removedAndNotAppliedAddons.length && optedAddons === {}"
          :class="{
            'addons-block__unit--actions_apply-active':
              !!removedAndNotAppliedAddons.length ||
              Object.keys(optedAddons).length,
          }"
          @click="changeIngredientsList"
        >
          Yeaahhh...
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// Todo: add unit-tests
import { PropType } from "vue";
import AddonBlockItem from "./AddonBlockItem.vue";
import { IPizzaSubObjectUnit } from "~/modules/Products/types";

const props = defineProps({
  isAddonsShown: {
    type: Boolean,
    required: true,
  },
  isAddonElementsListShown: {
    type: Boolean,
    required: true,
  },
  addons: {
    type: Array as PropType<IPizzaSubObjectUnit[]>,
    required: true,
  },
  removedAndAppliedAddons: {
    type: Array,
    required: true,
  },
  optedAddons: {
    type: Object,
    default: () => {},
  },
});

const emit = defineEmits([
  "changeIngredientsList",
  "showAddonElementsList",
  "showAddon",
]);

const removedAndNotAppliedAddons = ref<Array<string | number | unknown>>([]);
const combinedRemovements = computed((): string[] | unknown => {
  return [
    ...props.removedAndAppliedAddons,
    ...removedAndNotAppliedAddons.value,
  ];
});

const changeIngredient = (addon: IPizzaSubObjectUnit): void => {
  if (props.removedAndAppliedAddons.includes(addon.value)) {
    removedAndNotAppliedAddons.value = props.removedAndAppliedAddons.filter(
      (elem) => elem !== addon.value
    );
    emit("changeIngredientsList", removedAndNotAppliedAddons.value);
  } else if (removedAndNotAppliedAddons.value.includes(addon.value)) {
    removedAndNotAppliedAddons.value = removedAndNotAppliedAddons.value.filter(
      (elem) => elem !== addon.value
    );
  } else {
    removedAndNotAppliedAddons.value.push(addon.value);
  }
};
const canselChanges = (): void => {
  if (!props.isAddonElementsListShown) {
    removedAndNotAppliedAddons.value = [];
    changeIngredientsList();
    emit("showAddon");
  }
};
const closeAddons = (): void => {
  emit("showAddon");
};
const changeIngredientsList = (): void => {
  emit("changeIngredientsList", removedAndNotAppliedAddons.value);
  emit("showAddon");
};
const showAddonElementsList = (): void => {
  emit("showAddonElementsList", true);
};
</script>
<style lang="scss" scoped>
.addons-block {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 3;
  &__unit {
    position: absolute;
    top: 16px;
    right: 16px;
    padding: 24px 24px 16px;
    background-color: rgba(255, 255, 255, 1);
    width: 90%;
    height: auto;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #70544f;
    font-size: 18px;
    &--header {
      margin-bottom: 10px;
    }
    &--add {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
      position: relative;
      padding: 10px 0 10px 25px;
      font-weight: 500;
      font-family: Gotham Pro, -apple-system, BlinkMacSystemFont, Segoe UI,
        Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji,
        Segoe UI Symbol;
      color: #009471;
      &_i-plus {
        width: 16px;
        height: 16px;
      }
    }
    &--actions {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid rgba(0, 0, 0, 0.2);
      padding: 10px 0 0 0;
      &_apply {
        background-color: lightgray;
        position: relative;
        display: inline-block;
        vertical-align: middle;
        height: 48px;
        padding: 15px 25px;
        border-radius: 24px;
        border: none;
        color: #fff;
        font-size: 14px;
        font-family: Gotham Pro, -apple-system, BlinkMacSystemFont, Segoe UI,
          Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji,
          Segoe UI Symbol;
        font-weight: 700;
        text-align: center;
        text-transform: uppercase;
        cursor: pointer;
        &-active {
          background-color: #009471;
        }
      }
    }
  }
}
</style>
