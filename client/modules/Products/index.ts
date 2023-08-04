import path from "path";
import { defineNuxtModule } from "@nuxt/kit";

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
      pages.push({
        name: "root-redirect",
        path: "/:catchAll(.*)",
        redirect: "/products",
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
