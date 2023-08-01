<template>
  <div class="addon-item">
    <div :class="{ 'addon-item__removed-addon': removedAddon }">
      {{ addon.name }}
    </div>
    <div
      :class="{ 'addon-item__remove-button': removedAddon }"
      @click="changeIngredient(addon)"
    >
      <svg
        v-if="!removedAddon"
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 14 14"
      >
        <path
          fill="currentColor"
          fill-rule="evenodd"
          d="M8.41 7l4.95 4.95-1.41 1.41L7 8.41l-4.95 4.95-1.41-1.41L5.59 7 .64 2.05 2.05.64 7 5.59 11.95.64l1.41 1.41L8.41 7z"
        ></path>
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
      >
        <path
          d="M3.74 10.3a4.5 4.5 0 1 0 .94-4.98M4.6 1.85L3.5 5.9l4.03 1.22"
          fill="none"
          fill-rule="evenodd"
          stroke="currentColor"
          stroke-width="2"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Todo: add unit-tests
import {computed, PropType} from "vue";
import { IPizzaSubObjectUnit } from "~/modules/Products/types";

const props = defineProps({
  addon: {
    type: Object as PropType<IPizzaSubObjectUnit>,
    required: true,
  },
  removedIngredients: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["changeIngredient"]);

const changeIngredient = (addon: IPizzaSubObjectUnit): void => {
  emit("changeIngredient", addon);
};
const removedAddon = computed((): boolean => {
  return props.removedIngredients.includes(props.addon.value);
});
</script>

<style lang="scss" scoped>
.addon-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: 10px;
  &__removed-addon {
    color: rgba(112, 84, 79, 0.5);
    text-decoration: line-through;
  }
  &__remove-button {
    @extend .addon-item__removed-addon;
  }
}
</style>
