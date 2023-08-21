import { $api } from '~/plugins/api'
import { defineStore } from "pinia";
import {IIngredientModel, IIngredientUpdates} from "~/modules/Dashboard/types";

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    _ingredients: <IIngredientModel>[],
    _removalResult: <boolean>false,
    loaders: {
      _ingredientUpdateLoader: false,
      _ingredientCreateLoader: false,
      _ingredientRemoveLoader: false
    }
  }),
  getters: {
    ingredients: (store) => {
      return store._ingredients
    },
    isRemovalSuccess(store) {
      return store._removalResult
    },
    ingredientUpdateLoader(store) {
      return store.loaders._ingredientUpdateLoader
    },
    ingredientCreateLoader(store) {
      return store.loaders._ingredientCreateLoader
    },
    ingredientRemoveLoader(store) {
      return store.loaders._ingredientRemoveLoader
    }
  },
  
  actions: {
    setIngredients(ingredientsList) {
      this._ingredients = ingredientsList
    },
    setRemovalResult(result) {
      this._removalResult = result
    },
    toggleLoader(loaderName, state) {
      this.loaders[loaderName] = state
    },
    async addNewIngredient(payload) {
      this.toggleLoader('_ingredientCreateLoader', true)
      await $api.ingredients.addIngredient(payload).then((response) => {
        if (response.id) {
          this.fetchIngredientsList()
        }
      })
      this.toggleLoader('_ingredientCreateLoader', false)
    },
    async redactIngredient(payload: IIngredientUpdates) {
      this.toggleLoader('_ingredientUpdateLoader', true)
      const { ingredientId, redactedIngredient } = payload
      const response = await $api.ingredients.updateIngredient(ingredientId, redactedIngredient)
      if (response.status === 200) {
        this.fetchIngredientsList()
      }
      this.toggleLoader('_ingredientUpdateLoader', false)
    },
    async fetchIngredientsList() {
      const response = await $api.ingredients.getAllIngredients()
      this.setIngredients(response)
    },
    async removeIngredientFromList(id) {
      this.toggleLoader('_ingredientRemoveLoader', true)
      const response = await $api.ingredients.removeIngredient(id)
      if (response.status === 200) {
        this.setRemovalResult(response.data)
      }
      this.toggleLoader('_ingredientRemoveLoader', false)
    }
  }
});
