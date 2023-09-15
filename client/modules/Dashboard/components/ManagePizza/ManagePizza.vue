<template>
  <DashboardSection title="Pizza" :is-loading="pizzaCreating">
    <AddPizza
      :pizza-creating="pizzaCreating"
      :ingredient-select-mode="true"
      mode="creation"
    />
    <ItemsList
      title="Existed Pizzas"
      :expand="showPizzasList"
      @toggle-list="showPizzasList = !showPizzasList"
    >
      <DPizzaItem
          v-for="pizza in handledPizzas"
          :pizza-updating="pizzaUpdate"
          :data="pizza"
      />
    </ItemsList>
  </DashboardSection>
</template>

<script lang="ts" setup>
  import {computed, ref} from "vue";
  import {useDashboardStore} from "~/modules/Dashboard/store/DashbordStore";

  import DashboardSection from "../DashboardSection/DashboardSection.vue"
  import AddPizza from "../AddPizza/AddPizza.vue";
  import DPizzaItem from "../DPizzaItem/DPizzaItem.vue";
  import ItemsList from "~/components/ItemsList/ItemsList.vue";

  const dashboardStore = useDashboardStore();
  const showPizzasList = ref<boolean>(false)
  const pizzaCreating = computed(() => {
    return dashboardStore.pizzaAdditionLoader;
  });
  const pizzaUpdate = computed(() => {
    return dashboardStore.pizzaUpdateLoader;
  })
  const handledPizzas = computed(() => {
    return dashboardStore.pizzas.map((pizza) => {
      const handledPizza = {
        pastryTypes: pizza.pastryTypes.map((pastry) => pastry.value),
        ingredients: pizza.ingredients.map((ingredient) => ingredient.id),
        itemPrices: pizza.prices.map((price) => {
          return {
            id: price.id,
            value: price.value
          }
        }),
        nutrition: {
          id: pizza.nutrition.id,
          protein: pizza.nutrition.protein,
          fats: pizza.nutrition.fats,
          carbohydrates: pizza.nutrition.carbohydrates,
          energy: pizza.nutrition.energy
        },
        itemSizes: pizza.itemSizes.map((size) => {
          return {
            value: size.value,
            label: `${size.value} cm`,
            id: size.id
          }
        })
      }

      return Object.assign(pizza, handledPizza)
    })
  })
</script>

<style scoped>

</style>