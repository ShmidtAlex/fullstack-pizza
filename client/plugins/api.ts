import { AxiosError } from "axios";
import AuthorizationService from "~/modules/AuthorizationForm/api/auth";
import IngredientsService from "~/modules/Dashboard/api/ingredients";
import PizzaService from "~/modules/Dashboard/api/pizza";
import { IHttpService } from "~/models/Http/types";
import { useNuxtApp, defineNuxtPlugin } from "#app";

export interface IApi {
  auth: AuthorizationService;
  ingredients: IngredientsService;
  pizza: PizzaService;
}

let $api: IApi;

export default defineNuxtPlugin(() => {
  const context = useNuxtApp();
  // TODO: check => we maybe don't need it
  const interceptors = (service: IHttpService) => {
    // Add error handler
    service.axiosClient.interceptors.response.use(
      (response) => {
        return response;
      },
      (error: AxiosError) => {
        const status = error.response?.status;
        if (status === 401) {
          return context.store.dispatch("auth/destroy");
        }
        return Promise.reject(error);
      }
    );
    return service;
  };

  // Initialize API factories for using inside vue components
  const factories: IApi = {
    auth: new AuthorizationService(),
    ingredients: new IngredientsService(),
    pizza: new PizzaService(),
  };

  // Inject $api but in nuxt 3 manner
  context.provide("api", factories);

  // Initialize API variable for using outside the vue components
  $api = {
    auth: new AuthorizationService(),
    ingredients: new IngredientsService(),
    pizza: new PizzaService(),
  };
});

export { $api };
