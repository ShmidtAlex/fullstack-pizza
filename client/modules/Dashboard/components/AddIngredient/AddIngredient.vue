<template>
  <DashboardSection
    title="Ingredient addition"
  >
    <div class="inputs-container">
      <Input
        v-model="ingredientModel.name"
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
      <AddButton @proceedAddition="proceed"/>
    </div>

  </DashboardSection>
</template>

<script lang="ts" setup>

  import { useNuxtApp } from "#app";
  import DashboardSection from "../DashboardSection/DashboardSection.vue";
  import UploadButton from "~/components/UploadButton/index.vue";
  import AddButton from "~/components/AddButton/AddButton.vue";
  import {ref} from "vue";
  import {IIngredientModel} from "~/modules/Dashboard/types";

  const context = useNuxtApp()
  const ingredientModel = ref<IIngredientModel>({
    name: '',
    price: '',
    img: null
  })

  const uploadDocument = (files: any[]): void => {
    if (files.length) {
      ingredientModel.value.img = files[0]
    }
  }
  const proceed =  async () => {
    console.log(context.$api)
    await context.$api.ingredients.addIngredient(ingredientModel as IIngredientModel)
  }
</script>

<style scoped>
  .inputs-container {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    width: 500px;
  }
</style>