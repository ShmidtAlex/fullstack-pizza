<template>
  <DashboardSection
    title="Ingredient addition"
  >
    <div class="ingredient-container">
      <Input
        v-model="ingredientModel.name"
        id="ingredient-name"
        type="text"
        placeholder="Enter ingredient name"
        label="Name"
      />
      <Input
        v-model="ingredientModel.price"
        id="ingredient-price"
        type="number"
        label="Price"
        placeholder="Enter ingredient price"
      />
      <UploadButton @upload="uploadDocument" />
      <AddButton
          :disabled="isDisabled"
          @proceedAddition="proceed"
      />
    </div>
    <div class="list-container">
      <template v-if="ingredients.length">
        <Ingredient
            v-for="ingredient in ingredients"
            :key="ingredient.id"
            :data="ingredient"
            @remove="removeIngredient"
            @redact="redactIngredient"
        />
      </template>
      <template v-else>
        <EmptyData
            item-name="ingredients"
        />
      </template>
    </div>
  </DashboardSection>
</template>

<script lang="ts" setup>
  // Todo: create a plug for empty arrays responses
  // Todo: show ingredient image
  // Todo: design loaders
  import { useNuxtApp } from "#app";
  import { useDashboardStore } from "~/modules/Dashboard/store/DashbordStore";
  import {computed, onMounted, ref, watch} from "vue";

  import DashboardSection from "../DashboardSection/DashboardSection.vue";
  import UploadButton from "~/components/UploadButton/index.vue";
  import AddButton from "~/components/AddButton/AddButton.vue";
  import Ingredient from "../Ingredient/Ingredient.vue";

  import {IIngredientModel, IIngredientUpdates} from "~/modules/Dashboard/types";
  import { storeToRefs } from "pinia";
  import EmptyData from "~/components/EmptyDataPlug/EmptyData.vue";

  const context = useNuxtApp()
  const dashboardStore = useDashboardStore();
  const { ingredients, isRemovalSuccess } = storeToRefs(useDashboardStore());

  onMounted(() => {
    dashboardStore.fetchIngredientsList()
  })
  const ingredientModel = ref<IIngredientModel>({
    name: '',
    price: '',
    img: null
  })

  const isDisabled = computed(() => {
    return Object.values(ingredientModel.value).some((value) => !value)
  })
  const uploadDocument = (files: any[]): void => {
    if (files.length) {
      ingredientModel.value.img = files[0]
    }
  }
  const proceed = async () => {
    dashboardStore.addNewIngredient(ingredientModel.value as IIngredientModel)
    // await context.$api.ingredients.addIngredient(ingredientModel.value as IIngredientModel)
  }
  const removeIngredient = (id: number):void => {
    dashboardStore.removeIngredientFromList(id)
  }
  const redactIngredient = (updates: IIngredientUpdates):void => {
    dashboardStore.redactIngredient(updates)
  }
  watch(isRemovalSuccess, (newValue) => {
    if (newValue) {
      dashboardStore.fetchIngredientsList()
    }
  })
</script>

<style lang="scss" scoped>
  .ingredient-container {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    width: 510px;
  }
  .list-container {
    @extend .ingredient-container;
    flex-direction: column;
    padding: 16px;
  }
</style>