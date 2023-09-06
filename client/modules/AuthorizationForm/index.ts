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
          name: "auth",
          path: "/auth",
          file: path.resolve(__dirname, "./pages/UserSignInForm.vue"),
        },
        {
          name: "registration",
          path: "/registration",
          file: path.resolve(__dirname, "./pages/UserRegistrationForm.vue"),
        }
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
