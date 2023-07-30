<template>
  <div class="price-block">
    <button class="price-block__add-btn" @click="addPizzaToCart">
      Add to cart
    </button>
    <div class="price-block__content">{{ props.runningPrice }} &euro;</div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  runningPrice: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(["addPizzaToCart"]);
const addPizzaToCart = () => {
  emit("addPizzaToCart");
};
</script>

<style lang="scss" scoped>
.price-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  &__content {
    color: #70544f;
    position: relative;
    display: inline-block;
    font-family: Helvetica, sans-serif;
    font-weight: 500;
    line-height: 1;
    font-size: 24px;
  }
  &__add-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
    padding: 15px 25px;
    border-radius: 8px;
    background-color: #009471;
    border: none;
    color: #fff;
    font-family: Helvetica, sans-serif;
    font-weight: 700;
    text-transform: uppercase;
    cursor: pointer;
  }
}
</style>
