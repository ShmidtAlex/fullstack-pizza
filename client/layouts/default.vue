<template>
  <NavBar></NavBar>
  <div class="product-container">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import {useNuxtApp} from "#app";
import {onMounted} from "vue";
import {useUserStore} from "~/modules/AuthorizationForm/store/UserStore";
import {getCookie, H3Event} from "h3";
const { user } = useUserStore()
const context = useNuxtApp()
onMounted(() => {
  const token = getCookie(H3Event, 'jwt');
  console.log(token);
  if (token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    context.$api.auth.check(config)
        .then(response => {
          console.log(response);
          // Do something with the response
        })
        .catch(error => {
          console.error(error);
        });
  }
})

</script>

<style scoped>
.product-container {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 100px 2%;
}
</style>
