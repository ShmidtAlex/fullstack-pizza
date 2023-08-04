import AuthorizationService from '~/modules/AuthorizationForm/api/auth';

import { AxiosError } from 'axios'
import { IHttpService } from '~/models/Http/types'
import {useNuxtApp} from "#app";
import {defineNuxtPlugin} from "#app";

export interface IApi {
  auth: AuthorizationService,
};

let $api: IApi;

export default defineNuxtPlugin(() => {
  const context = useNuxtApp()
  // TODO: check => we maybe don't need it
  const interceptors = (service: IHttpService) => {
    //Add error handler
    service.axiosClient.interceptors.response.use(
      (response) => {
        return response
      },
      (error: AxiosError) => {
        const status = error.response?.status
        if (status === 401) {
          return context.store.dispatch('auth/destroy')
        }
        return Promise.reject(error)
      }
    )
    return service
  }
  
  // Initialize API factories
  const factories: IApi = {
    auth: new AuthorizationService(),
  }
  
  // Inject $api but in nuxt 3 manner
  context.provide('api', factories)
})

export { $api }
