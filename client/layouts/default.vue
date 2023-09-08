<template>
  <NavBar></NavBar>
  <div class="product-container">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
// const isAuthLayout = false;
// const isAuthenticated = false;
//
// const showAuthForm = () => {
//   this.isAuthLayout = true;
// };
</script>

<style scoped>
.product-container {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 100px 2%;
  background-color: rgba(197, 208, 230, .2);
}
</style>
