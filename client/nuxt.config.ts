// https://nuxt.com/docs/api/configuration/nuxt-config
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
  pinia: {
    autoImports: ["defineStore"],
  },
});
