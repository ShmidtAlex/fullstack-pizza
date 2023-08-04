<template>
  <AuthForm label="Sign in" :by-phone="signInByPhone" link="registration"/>
</template>
<script lang="ts" setup>
  const signInByPhone = false;
</script>
