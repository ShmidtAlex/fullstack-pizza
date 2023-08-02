import axios, {CreateAxiosDefaults} from "axios";
import { defineNuxtPlugin, useRuntimeConfig } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  
  const $host = axios.create({
    baseURL: nuxtApp.$config.public.API_BASE_URL,
    headers: {
      common: {},
    },
  } as CreateAxiosDefaults);
  
  const $authHost = axios.create({
    baseURL: nuxtApp.$config.public.API_BASE_URL,
    headers: {
      common: {},
    },
  } as CreateAxiosDefaults);
  const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
  }
  $authHost.interceptors.request.use(authInterceptor)
  return {
    provide: {
      api: $host,
      authApi: $authHost
    },
  };
});

