<template>
  <div class="count-manager">
    <div class="count-manager__actions">
      <div
        class="count-manager__actions_decrease"
        :class="{ 'count-manager__actions_decrease_active': decreaseActive }"
        @click="emits('decreaseNumber', unit.id)"
      >
        <!--        Todo: remove to base components, use slot for icon or letter -->
        <span class="change-quantity">-</span>
      </div>
      <div class="count-manager__actions_running-number">
        {{ unit.quantity }}
      </div>
      <div
        class="count-manager__actions_increase count-manager__actions_increase_active"
        @click="emits('increaseNumber', unit.id)"
      >
        <span class="change-quantity">+</span>
      </div>
    </div>
    <div v-if="unit.totalPrice" class="totally-pizzatype">
      {{ unit.quantity * unit.totalPrice }} &euro;
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IFinalObjectForCart, TAddonsForCart } from "~/modules/Products/types";

const props = defineProps({
  unit: {
    type: Object as PropType<IFinalObjectForCart | TAddonsForCart>,
    required: true,
  },
  minCount: {
    type: Number,
    default: 1,
  },
});

const emits = defineEmits(["increaseNumber", "decreaseNumber"]);
const decreaseActive = computed(() => {
  return props.unit.quantity >= props.minCount;
});
</script>

<style lang="scss" scoped>
.count-manager {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  &__actions {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 30%;
    min-width: fit-content;
    &_increase,
    &_decrease {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 20px;
      width: 20px;
      border-radius: 50%;
      outline: none;
      background-color: rgba(0, 0, 0, 0.1);
      cursor: pointer;
      position: relative;
      margin: 4px;
      &_active,
      &_active {
        border: none;
        background-color: #e1faf4;
        color: #009471;
      }
      .change-quantity {
        position: absolute;
        top: -1px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>
