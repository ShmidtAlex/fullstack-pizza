import { $api } from '~/plugins/api'
import { defineStore } from "pinia";
import {IIngredientModel, IIngredientUpdates} from "~/modules/Dashboard/types";

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    _ingredients: <IIngredientModel>[],
    _removalResult: <boolean>false,
    _preUploadedImageSrc: '',
    _sizesList: [],
    loaders: {
      _ingredientUpdateLoader: false,
      _ingredientCreateLoader: false,
      _ingredientRemoveLoader: false
    },
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
    },
    uploadedImgSrc(store) {
      return store._preUploadedImageSrc
    },
    sizes(store) {
      return store._sizesList
    }
  },
  
  actions: {
    setIngredients(ingredientsList):void {
      this._ingredients = ingredientsList
    },
    setRemovalResult(result):void {
      this._removalResult = result
    },
    toggleLoader(loaderName, state):void {
      this.loaders[loaderName] = state
    },
    setPreloadedImage(img):void {
      this._preUploadedImageSrc = `uploads/${img}`
    },
    setSizes(data: any):void {
      this._sizesList = data
    },
    async addNewIngredient(payload):void {
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
        await this.fetchIngredientsList()
      }
      this.toggleLoader('_ingredientUpdateLoader', false)
    },
    async fetchIngredientsList() {
      const response = await $api.ingredients.getAllIngredients()
      this.setIngredients(response)
    },
    async removeIngredientFromList(id):void {
      this.toggleLoader('_ingredientRemoveLoader', true)
      const response = await $api.ingredients.removeIngredient(id)
      if (response.status === 200) {
        this.setRemovalResult(response.data)
      }
      this.toggleLoader('_ingredientRemoveLoader', false)
    },
    async preUploadImage(payload: File):void {
      try {
        const sendingResult = await $api.pizza.uploadImage(payload);
        this.setPreloadedImage(sendingResult.imageUrl);
        localStorage.setItem('preloadedImage', sendingResult.imageUrl);
      } catch (error) {
        console.error('Error in preUploadImage:', error);
      }
    },
    async fetchPizzaSizes():void {
      const sizes = await $api.pizza.fetchSizes()
      this.setSizes(sizes)
    },
    async createSize(payload: { value: number }):void {
      await $api.pizza.createSize(payload).then((response) => {
        if (response.data.size)
        this.fetchPizzaSizes()
      })
    }
  }
});
