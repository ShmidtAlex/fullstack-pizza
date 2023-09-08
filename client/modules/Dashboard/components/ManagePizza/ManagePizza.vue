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
          v-for="pizza in dashboardStore.pizzas"
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

</script>

<style scoped>

</style>