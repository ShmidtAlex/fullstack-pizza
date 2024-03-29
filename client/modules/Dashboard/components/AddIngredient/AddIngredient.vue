<template>
  <ModalContainer
    v-if="removalConfirmation"
    title="Ingredient Removal"
    :is-footer="false"
    @close="close"
  >
    <ActionConfirmation
      action-name="remove ingredient"
      @cancel="close"
      @confirm="removeIngredient"
    />
  </ModalContainer>
  <DashboardSection title="Pizza's ingredients" :is-loading="isLoading">
    <!--    Todo: despite after ingredient addition ingredientModel resets, value in fields stays unchanged, that could be misleading -->
    <div v-if="authStore.isAdmin" class="ingredient-container">
      <BaseInput
        id="ingredient-name"
        v-model="ingredientModel.name"
        type="text"
        placeholder="Enter ingredient name"
        label="Name"
      />
      <BaseInput
        id="ingredient-price"
        v-model="ingredientModel.price"
        type="number"
        label="Price"
        placeholder="Enter ingredient price"
      />
      <UploadButton id="up-load" @upload="uploadImage" />
      <AddButton :disabled="isDisabled" @proceed="proceed">Add +</AddButton>
    </div>
    <ItemsList
      title="Show available ingredients"
      :expand="showList"
      @toggle-list="showList = !showList"
    >
      <template v-if="ingredients.length">
        <DPizzaIngredient
          v-for="ingredient in ingredients"
          :key="ingredient.id"
          :data="ingredient"
          @remove="confirmRemoval"
          @redact="redactIngredient"
        />
      </template>
      <template v-else>
        <EmptyData item-name="ingredients" />
      </template>
    </ItemsList>
  </DashboardSection>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import DashboardSection from "../DashboardSection/DashboardSection.vue";
import DPizzaIngredient from "../DPizzaIngredient/DPizzaIngredient.vue";

import ModalContainer from "~/components/ModalContainer/ModalContainer.vue";
import { useDashboardStore } from "~/modules/Dashboard/store/DashbordStore";
import { useAuthStore } from "~/modules/AuthorizationForm/store/AuthStore";

import UploadButton from "~/components/UploadButton/UploadButton.vue";
import AddButton from "~/components/AddButton/AddButton.vue";
import ItemsList from "~/components/ItemsList/ItemsList.vue";
import {
  IIngredientModel,
  IIngredientUpdates,
} from "~/modules/Dashboard/types";
import EmptyData from "~/components/EmptyDataPlug/EmptyData.vue";
import ActionConfirmation from "~/components/ActionConfirmation/ActionConfirmation.vue";
const dashboardStore = useDashboardStore();
const { ingredients, isRemovalSuccess } = storeToRefs(useDashboardStore());

onMounted(() => {
  dashboardStore.fetchIngredientsList();
});
const ingredientModel = ref<IIngredientModel>({
  name: "",
  price: "",
  img: null,
});

const showList = ref<boolean>(false);
const isDisabled = computed(() => {
  return Object.values(ingredientModel.value).some((value) => !value);
});

const authStore = useAuthStore();
const isLoading = computed(() => {
  return (
    dashboardStore.ingredientUpdateLoader ||
    dashboardStore.ingredientCreateLoader ||
    dashboardStore.ingredientRemoveLoader
  );
});

const uploadImage = (files: any[]): void => {
  if (files.length) {
    ingredientModel.value.img = files[0];
  }
};
const proceed = async () => {
  await dashboardStore.addNewIngredient(
    ingredientModel.value as IIngredientModel
  );
  resetIngredientModel();
};
const removalConfirmation = ref<boolean>(false);
const close = () => {
  removalConfirmation.value = false;
};
const removedIngredientId = ref<number | string>("");
const confirmRemoval = (value: string | number) => {
  removedIngredientId.value = value;
  removalConfirmation.value = true;
};
const removeIngredient = (): void => {
  dashboardStore.removeIngredientFromList(removedIngredientId.value);
  removalConfirmation.value = false;
};
const redactIngredient = (updates: IIngredientUpdates): void => {
  dashboardStore.redactIngredient(updates);
};
const resetIngredientModel = () => {
  ingredientModel.value = {
    name: "",
    price: "",
    img: null,
  };
};
watch(isRemovalSuccess, (newValue) => {
  if (newValue) {
    dashboardStore.fetchIngredientsList();
  }
});
</script>

<style lang="scss" scoped>
.ingredient-container {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  width: 510px;
}
</style>
