import { $api } from '~/plugins/api'
import { defineStore } from "pinia";
import {IIngredientModel} from "~/modules/Dashboard/types";

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    _ingredients: <IIngredientModel>[],
    _removalResult: <boolean>false
  }),
  getters: {
    ingredients: (store) => {
      return store._ingredients
    },
    isRemovalSuccess(store) {
      return store._removalResult
    }
  },
  
  actions: {
    setIngredients(ingredientsList) {
      this._ingredients = ingredientsList
    },
    setRemovalResult(result) {
      this._removalResult = result
    },
    async addNewIngredient(payload) {
      await $api.ingredients.addIngredient(payload).then((response) => {
        if (response.id) {
          this.fetchIngredientsList()
        }
      })
    },
    async fetchIngredientsList() {
      const response = await $api.ingredients.getAllIngredients()
      this.setIngredients(response)
    },
    async removeIngredientFromList(id) {
      const response = await $api.ingredients.removeIngredient(id)
      if (response.status === 200) {
        this.setRemovalResult(response.data)
      }
    }
  }
});
