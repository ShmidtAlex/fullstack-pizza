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
  css: ["bootstrap/dist/css/bootstrap.min.css"],
  build: {
    extend(config, ctx) {
      // Add or modify compilerOptions here
      config.resolve.alias['vue'] = 'vue/dist/vue.esm-bundler.js';
    },
  },
  server: {
    host: 'localhost',
    port: 3000
  },
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
      NUXT_ENV_BASE_URL: process.env.NUXT_ENV_BASE_URL as string,
    },
  },
  pinia: {
    autoImports: ["defineStore"],
  },
} as NuxtOptions);
