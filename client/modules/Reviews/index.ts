import { defineNuxtModule } from "@nuxt/kit";
export default defineNuxtModule({
  meta: {
    // Usually  npm package name of your module
    name: "@nuxtjs/reviews",
    // The key in `nuxt.config` that holds your module options
    configKey: "sample",
    // Compatibility constraints
    compatibility: {
      // Semver version of supported nuxt versions
      nuxt: "^3.0.0",
    },
  },
  // Default configuration options for your module
  defaults: {},
  hooks: {},
  async setup(moduleOptions, nuxt) {
    console.log(moduleOptions);
    // -- Add your module logic here --
  },
});
