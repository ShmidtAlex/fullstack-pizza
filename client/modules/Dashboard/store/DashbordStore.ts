import { defineStore } from "pinia";
import { $api } from "~/plugins/api";
import {
  IIngredientModel,
  IIngredientUpdates,
  IPizzaModel,
} from "~/modules/Dashboard/types";

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    _ingredients: <IIngredientModel>[],
    _removalResult: <boolean>false,
    _preUploadedImageSrc: "",
    _sizesList: [],
    _pizzaData: null,
    loaders: {
      _ingredientUpdateLoader: false,
      _ingredientCreateLoader: false,
      _ingredientRemoveLoader: false,
      _pizzaAdditionLoader: false,
    },
  }),
  getters: {
    ingredients(store) {
      return store._ingredients;
    },
    isRemovalSuccess(store) {
      return store._removalResult;
    },
    ingredientUpdateLoader(store) {
      return store.loaders._ingredientUpdateLoader;
    },
    ingredientCreateLoader(store) {
      return store.loaders._ingredientCreateLoader;
    },
    ingredientRemoveLoader(store) {
      return store.loaders._ingredientRemoveLoader;
    },
    pizzaAdditionLoader(store) {
      return store.loaders._pizzaAdditionLoader;
    },
    uploadedImgSrc(store) {
      return store._preUploadedImageSrc;
    },
    sizes(store) {
      return store._sizesList;
    },
  },

  actions: {
    setIngredients(ingredientsList): void {
      this._ingredients = ingredientsList;
    },
    setRemovalResult(result): void {
      this._removalResult = result;
    },
    toggleLoader(loaderName, state): void {
      this.loaders[loaderName] = state;
    },
    setPreloadedImage(img): void {
      this._preUploadedImageSrc = img;
    },
    setSizes(data: any): void {
      this._sizesList = data;
    },
    setPizzaData(pizza): void {
      this._pizzaData = pizza;
    },
    async addNewIngredient(payload): Promise<void> {
      this.toggleLoader("_ingredientCreateLoader", true);
      await $api.ingredients.addIngredient(payload).then((response) => {
        if (response.id) {
          this.fetchIngredientsList();
        }
      });
      this.toggleLoader("_ingredientCreateLoader", false);
    },
    async redactIngredient(payload: IIngredientUpdates) {
      this.toggleLoader("_ingredientUpdateLoader", true);
      const { ingredientId, redactedIngredient } = payload;
      const response = await $api.ingredients.updateIngredient(
        ingredientId,
        redactedIngredient
      );
      if (response.status === 200) {
        await this.fetchIngredientsList();
      }
      this.toggleLoader("_ingredientUpdateLoader", false);
    },
    async fetchIngredientsList() {
      const response = await $api.ingredients.getAllIngredients();
      this.setIngredients(response);
    },
    async removeIngredientFromList(id): Promise<void> {
      this.toggleLoader("_ingredientRemoveLoader", true);
      const response = await $api.ingredients.removeIngredient(id);
      if (response.status === 200) {
        this.setRemovalResult(response.data);
      }
      this.toggleLoader("_ingredientRemoveLoader", false);
    },
    async preUploadImage(payload: File): Promise<void> {
      try {
        const sendingResult = await $api.pizza.uploadImage(payload);
        this.setPreloadedImage(`uploads/${sendingResult.imageUrl}`);
        localStorage.setItem("preloadedImage", sendingResult.imageUrl);
      } catch (error) {
        console.error("Error in preUploadImage:", error);
      }
    },
    async fetchPreloadedImage(payload: string) {
      return await $api.pizza.fetchUploadedImage(payload);
    },
    async fetchPizzaSizes(): Promise<void> {
      // Todo: add logic for filtering only unique files
      const sizes = await $api.pizza.fetchSizes();
      let uniqueSizes;
      if (sizes) {
        uniqueSizes = sizes.filter(
          (a, i) => sizes.findIndex((s) => a.value === s.value) === i
        );
      }

      this.setSizes(uniqueSizes);
    },
    async createSize(payload: { value: number }): Promise<void> {
      await $api.pizza.createSize(payload).then((response) => {
        if (response.data.size) this.fetchPizzaSizes();
      });
    },
    async createPizza(payload: IPizzaModel): Promise<void> {
      this.toggleLoader("_pizzaAdditionLoader", true);
      const pizza = await $api.pizza.createNewPizza(payload);

      if (pizza.status === 200) {
        this.setPizzaData(pizza.data);
        const fileName = this.uploadedImgSrc.split("/")[1];
        await $api.pizza.removeUploadedImage(fileName);
      }

      this.toggleLoader("_pizzaAdditionLoader", false);
    },
  },
});
