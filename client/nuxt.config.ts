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
  plugins: ["~/plugins/api"],
  css: ["bootstrap/dist/css/bootstrap.min.css", "~/assets/css/buttons.scss"],
  build: {
    transpile: ["@vee-validate/rules"]
  },
  server: {
    host: "localhost",
    port: 3000,
  },
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
      NUXT_ENV_BASE_URL: process.env.NUXT_ENV_BASE_URL,
      CLIENT_URL: process.env.CLIENT_URL
    },
  },
  pinia: {
    autoImports: ["defineStore"],
  },
} as NuxtOptions);
