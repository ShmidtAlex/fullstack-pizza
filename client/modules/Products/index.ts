import path from "path";
import { defineNuxtModule, addComponentsDir, useNuxt } from "@nuxt/kit";

export default defineNuxtModule({
  // Default configuration options for your module
  defaults: {},
  hooks: {
    // ROUTES
    "pages:extend"(pages) {
      pages.push({
        name: "products",
        path: "/products",
        file: path.resolve(__dirname, "./pages/ProductsPage.vue"),
      });
    },

    // COMPONENTS
    "components:dirs"(dirs) {
      // Add ./components dir to the list
      dirs.push({
        path: path.resolve(__dirname, "./components"),
      });
    },

    // COMPOSABLES
    // "autoImports:dirs"(dirs) {
    //   // Todo: TSError
    //   dirs.push({
    //     path: path.resolve(__dirname, "./composables")
    //   });
    // },
  },
  async setup(moduleOptions, nuxt) {
    // -- Add your module logic here --
  },
});
