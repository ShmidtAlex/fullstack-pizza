<template>
  <div class="label">{{ label }}</div>
  <div v-for="size in sizes" :key="size.id" class="price">
    <div class="price__item">{{ size.label }}</div>
    <Price
      :size="size"
      :previous-price="findRelatedPrice(size.id)"
      @confirm="confirm"
      @remove="removeSizeAndPrice"
      @reset="reset"
    />
  </div>
</template>

<script lang="ts" setup>
// Todo: instead of prevent user click event on button, add validation
// Todo: make components draggable !important
import { PropType } from "vue";
import Price from "../Price/Price.vue";
import { IPrice } from "../../types";
import { IOptions } from "~/components/types";

const props = defineProps({
  sizes: {
    type: Array as PropType<IOptions[]>,
    default: () => [],
  },
  label: {
    type: String,
    default: "",
  },
  prices: {
    type: Array as PropType<IPrice[]>,
    default: () => [],
  },
});
const findRelatedPrice = (id) => {
  return props.prices.length
    ? props.prices.find((item) => item.id === id).value
    : 0;
};
const emit = defineEmits(["confirm", "remove", "reset"]);
// const currentPrice
const confirm = (data) => {
  emit("confirm", data);
};
const removeSizeAndPrice = (id) => {
  emit("remove", Number(id));
};
const reset = (id: number) => {
  emit("reset", id);
};
</script>

<style lang="scss" scoped>
.label {
  margin-bottom: 8px;
  font-weight: 500;
}
.price {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 16px;
  border-radius: 8px;
  margin-bottom: 8px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.3);
  &__item {
    display: flex;
    align-items: center;
    width: 50px;
    min-width: fit-content;
    height: 32px;
    margin-right: 16px;
  }
  :deep .input,
  .add-button {
    margin-bottom: 0px;
  }
}
</style>
