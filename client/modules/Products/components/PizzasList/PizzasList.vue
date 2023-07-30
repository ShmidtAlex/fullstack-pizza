<template>
  <div id="pizzas" class="pizzas-list-container">
    <div v-for="pizza in pizzaData" :key="pizza.id" class="pizza-sort">
      <PizzaUnit :pizza-data="pizza" @collapse-section="collapse" />
    </div>
  </div>
</template>
<script setup lang="ts">
import PizzaUnit from "../PizzaUnit/PizzaUnit.vue";
import { useProductsStore } from "~/modules/Products/store/ProductsStore";
const { collapse } = useProductsStore();
const { data: pizzaData } = await useFetch(`http://localhost:3404/pizzasData`);
</script>
<style scoped>
.pizzas-list-container {
  width: 100%;
  height: 100%;
  min-height: fit-content;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.pizza-sort {
  margin: 10px 10px 0 10px;
}
@media (max-width: 1585px) {
  .pizza-sort {
    margin: 10px 10px 0 0;
  }
}
@media (max-width: 540px) and (orientation: portrait) {
  .pizzas-list-container {
    justify-content: center;
  }
}
</style>
