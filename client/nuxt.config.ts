// https://nuxt.com/docs/api/configuration/nuxt-config

import { NuxtOptions } from "@nuxt/schema";

export default defineNuxtConfig({
  pages: true,
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    // './modules/BonusProgram',
    "./modules/Products",
    // './modules/RegistrationForm',
    // './modules/Reviews',
    // './modules/UserAccount',
    "./modules/AuthorizationForm",
  ],
  build: { transpile: ["@vee-validate/rules"] },
  vite: {},
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
      SERVER_BASE_URL: process.env.SERVER_BASE_URL,
    },
  },
  pinia: {
    autoImports: ["defineStore"],
  },
} as NuxtOptions);
