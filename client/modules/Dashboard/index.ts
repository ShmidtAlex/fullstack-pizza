import path from "path";
import { defineNuxtModule } from "@nuxt/kit";

export default defineNuxtModule({
  // Default configuration options for your module
  defaults: {},
  hooks: {
    // ROUTES
    "pages:extend"(pages) {
      pages.push(
        {
          name: "dashboard",
          path: "/dashboard",
          file: path.resolve(__dirname, "./pages/Dashboard.vue"),
        },
      );
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
    //   dirs.push(path.resolve(__dirname, "./composables"));
    // },
  },
  async setup(moduleOptions, nuxt) {
    // -- Add your module logic here --
  },
});
