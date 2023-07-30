<template>
  <div>
    AuthLayout
    <NavBar></NavBar>
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
// import UserAccount from '../components/UserAccount/UserAccount.vue'
// import NavBar from '../components/NavBar/NavBar.vue'
// export default {
//   components: {
//     UserAccount,
//     NavBar
//   },
//   methods: {
//     showSignInForm() {
//       23px
//       this.$emit('showAuthLayout')
//     }
//   },
// }
</script>

<style scoped></style>
