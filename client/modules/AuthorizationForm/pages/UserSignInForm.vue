<template>
  <AuthForm label="Login" :by-phone="signInByPhone" link="registration"/>
</template>
<script lang="ts" setup>
  const signInByPhone = false;
</script>
