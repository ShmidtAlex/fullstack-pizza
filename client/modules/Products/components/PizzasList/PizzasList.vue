<template>
  <div id="pizzas" class="pizzas-list-container">
    <div v-for="pizza in data" :key="pizza.id" class="pizza-sort">
      <PizzaUnit :pizza-data="pizza" @collapse-section="collapse" />
    </div>
  </div>
</template>
<script setup lang="ts">
import PizzaUnit from "../PizzaUnit/PizzaUnit.vue";
import { useProductsStore } from "~/modules/Products/store/ProductsStore";
import {useFetch, useRuntimeConfig} from "#app";
const { collapse } = useProductsStore();
const config = useRuntimeConfig();
// TODO: able to receive data from server, but the problem is in parsing the data in PizzaUnit component (supposing because of data's type)
const { data }= await useFetch(`${config.public.API_BASE_URL}/pizza`);

console.log(config.public.API_BASE_URL, data, data.value[0])

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
