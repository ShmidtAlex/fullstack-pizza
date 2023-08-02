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
  plugins: ['~/plugins/http.ts'],
  css: ["bootstrap/dist/css/bootstrap.min.css"],
  build: { transpile: ["@vee-validate/rules"] },
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
      SERVER_BASE_URL: process.env.SERVER_BASE_URL as string,
    },
  },
  pinia: {
    autoImports: ["defineStore"],
  },
} as NuxtOptions);
