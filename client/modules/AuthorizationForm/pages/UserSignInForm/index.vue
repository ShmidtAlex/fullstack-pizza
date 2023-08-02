<template>
  <AuthForm label="sign in" :by-phone="signInByPhone" link="registration"/>
</template>
<script lang="ts" setup>
  const signInByPhone = false;
</script>
