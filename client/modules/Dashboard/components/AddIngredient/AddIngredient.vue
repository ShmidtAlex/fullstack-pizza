<template>
  <DashboardSection
    title="Ingredient addition"
  >
    <div class="inputs-container">
      <Input
        v-model="ingredientName"
        type="text"
        placeholder="Enter ingredient name"
        label="Name"
      />
      <Input
        v-model="ingredientPrice"
        id="ingredient-price"
        type="number"
        label="Price"
        placeholder="Enter ingredient price"
      />
      <UploadButton />
      <AddButton @proceedAddition="proceed"/>
    </div>

  </DashboardSection>
</template>

<script lang="ts" setup>
  import DashboardSection from "../DashboardSection/DashboardSection.vue";
  import UploadButton from "~/components/UploadButton/index.vue";
  import AddButton from "~/components/AddButton/AddButton.vue";
  import {ref} from "vue";

  const ingredientName = ref<string>('')
  const ingredientPrice = ref<string>('')
  const proceed = () => {

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