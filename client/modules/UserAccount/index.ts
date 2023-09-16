import { defineNuxtModule } from "@nuxt/kit";
import path from "path";
export default defineNuxtModule({
 
  // Default configuration options for your module
  defaults: {},
  hooks: {
    // ROUTES
    "pages:extend"(pages) {
      pages.push({
        name: "account",
        path: "/account",
        file: path.resolve(__dirname, "./pages/UserAccount.vue"),
      });
    },
  
    // COMPONENTS
    "components:dirs"(dirs) {
      // Add ./components dir to the list
      dirs.push({
        path: path.resolve(__dirname, "./components"),
      });
    },
  },
  async setup(moduleOptions, nuxt) {
    console.log(moduleOptions);
    // -- Add your module logic here --
  },
});
