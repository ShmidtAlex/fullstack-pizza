import { defineStore } from "pinia";
import { $api } from "~/plugins/api";
import {
  IIngredientModel,
  IIngredientUpdates,
  IPizzaModel, IUser,
} from "~/modules/Dashboard/types";
import {IIsSuccess} from "~/components/types";

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    _ingredients: <IIngredientModel>[],
    _removalResult: <boolean>false,
    _preUploadedImageSrc: "",
    _sizesList: [],
    _pizzaData: null,
    _usersList: <IUser>[],
    _pizzasList: <IPizzaModel>[],
    loaders: {
      _ingredientUpdateLoader: false,
      _ingredientCreateLoader: false,
      _ingredientRemoveLoader: false,
      _pizzaAdditionLoader: false,
      _fetchUsersLoader: false,
      _fetchPizzasLoader: false,
      _updatePizzaLoader: false,
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
    fetchUsersLoader(store) {
      return store.loaders._fetchUsersLoader;
    },
    pizzasListLoader(store) {
      return store.loaders._fetchPizzasLoader;
    },
    pizzaUpdateLoader(store) {
      return store.loaders._updatePizzaLoader;
    },
    uploadedImgSrc(store) {
      return store._preUploadedImageSrc;
    },
    sizes(store) {
      return store._sizesList;
    },
    users(store) {
      return store._usersList;
    },
    pizzas(store) {
      return store._pizzasList;
    }
  },

  actions: {
    setIngredients(ingredientsList: IIngredientModel[]): void {
      this._ingredients = ingredientsList;
    },
    setRemovalResult(result: IIsSuccess): void {
      this._removalResult = result;
    },
    toggleLoader(loaderName: string, state): void {
      this.loaders[loaderName] = state;
    },
    setPreloadedImage(img: string): void {
      this._preUploadedImageSrc = img;
    },
    setSizes(data: any): void {
      this._sizesList = data;
    },
    setPizzaData(pizza: IPizzaModel): void {
      this._pizzaData = pizza;
    },
    setUserList(users: IUser[]): void {
      this._usersList = users;
    },
    setPizzasList(pizzas: IPizzaModel[]): void {
      this._pizzasList = pizzas
    },
    async addNewIngredient(payload: IIngredientModel): Promise<void> {
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
    async removeIngredientFromList(id: number): Promise<void> {
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
    async fetchImage(payload: string) {
      return await $api.pizza.fetchImage(payload)
    },
    async fetchPizzaSizes(): Promise<void> {
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
    async fetchPizzasList(): Promise<void> {
      this.toggleLoader("_pizzasListLoader", true);
      const result = await $api.pizza.fetchPizzasList();
      const mapped = result.map((pizza) => {
        return {
          ...pizza,
          ingredientsIds: pizza.ingredients.map((ingredient) => ingredient.id)
        }
      })
      this.setPizzasList(mapped)
      this.toggleLoader("_pizzasListLoader", false);
    },
    async fetchUserList(): Promise<void> {
      this.toggleLoader("_fetchUsersLoader", true)
      const result = await $api.user.getAllUsers()
      this.setUserList(result)
      this.toggleLoader("_fetchUsersLoader", false)
    }
  },
});
