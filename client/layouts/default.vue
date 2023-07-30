<template>
  <NavBar></NavBar>
  <div class="product-container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  setup() {
    const isAuthenticated = true;
    const isAuthLayout = false;
    return {
      isAuthLayout,
      isAuthenticated,
    };
  },
};
// export default {
//   name: "default.vue",
//   components: {
//     MainLayout,
//     AuthLayout
//   }
//
// }
const showAuthForm = () => {
  isAuthLayout = true;
};
</script>

<style scoped>
.product-container {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 100px 2%;
}
</style>
