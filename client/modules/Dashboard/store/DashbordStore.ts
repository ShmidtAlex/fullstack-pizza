import { $api } from '~/plugins/api'
import { defineStore } from "pinia";
import {IIngredientModel, IIngredientUpdates} from "~/modules/Dashboard/types";
const convertResponseToImageDataUrl = (response) => {
  const contentType = response.headers['content-type'];
  const data = response.data;
  
  // Convert the Uint8Array to a regular array
  const dataArray = Array.from(new Uint8Array(data));
  
  // Create a Blob from the array
  const blob = new Blob([new Uint8Array(dataArray)], { type: contentType });
  
  // Create a URL for the Blob and return it
  return URL.createObjectURL(blob);
}
export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    _ingredients: <IIngredientModel>[],
    _removalResult: <boolean>false,
    loaders: {
      _ingredientUpdateLoader: false,
      _ingredientCreateLoader: false,
      _ingredientRemoveLoader: false
    },
    _preUploadedImage: ''
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
      return store._preUploadedImage
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
    setPreloadedImage(img) {
      console.log(img)
      this._preUploadedImageName = img
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
    },
    async preUploadImage(payload) {
      console.log('Starting preUploadImage...');
      try {
        const sendingResult = await $api.pizza.uploadImage(payload);
        console.log('sendingResult:', sendingResult);
        const gettingResult = await this.getPreUploaded(sendingResult.fileName);
        console.log('gettingResult:', gettingResult);
        const imageData = gettingResult.data;
    
        console.log('Setting preloaded image data...');
        this.setPreloadedImage(imageData);
    
        console.log('Preupload process completed.');
      } catch (error) {
        console.error('Error in preUploadImage:', error);
      }
    },
    async getPreUploaded(name) {
      const response = await $api.pizza.getPreUploaded(name)
      return response
    }
  }
});
