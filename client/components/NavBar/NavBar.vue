<template>
  <!--  Todo: rewrite with 'clean code' principles priority: low-->
  <div class="navbar-container shadow-sm bg-white">
    <div class="logo">
      <img
        src="../daddy-jones.svg"
        alt="daddy jones logo"
        class="logo-daddy-jones"
      />
    </div>
    <ul v-if="showMenu" class="navbar-container__menu">
      <li class="navbar-container__menu-item font-bold">
        <NuxtLink to="/products">Pizza</NuxtLink>
      </li>
      <!--      <li class="navbar-container__menu-item font-bold"><NuxtLink to="/combo">Combo</NuxtLink></li>-->
      <!--      <li class="navbar-container__menu-item font-bold"><NuxtLink to="/snacks">Snacks</NuxtLink></li>-->
      <!--      <li class="navbar-container__menu-item font-bold"> <NuxtLink to="/salads">Salads</NuxtLink></li>-->
      <!--      <li class="navbar-container__menu-item font-bold"><NuxtLink to="/desserts">Desserts</NuxtLink></li>-->
      <!--      <li class="navbar-container__menu-item font-bold"><NuxtLink to="/souses">Sauces</NuxtLink></li>-->
      <!--      <li class="navbar-container__menu-item font-bold"><NuxtLink to="/hot-meals">Hot meals</NuxtLink></li>-->
    </ul>
    <div v-else class="main-view">
      <div class="city_block">
        <label for="city-option">{{ city }}</label>
        <select id="city-option" v-model="city" name="city" class="region">
          <option value="London">London</option>
          <option value="Berlin">Berlin</option>
          <option value="Rome">Rome</option>
        </select>
      </div>

      <div class="menu-list">
        <ul>
          <NuxtLink class="font-bold" href=""><li>Menu</li></NuxtLink>
          <NuxtLink class="font-bold" href=""><li>Promotions</li></NuxtLink>
          <NuxtLink class="font-bold" href=""><li>Bonuses</li></NuxtLink>
          <NuxtLink class="font-bold" href=""><li>Contact us</li></NuxtLink>
        </ul>
      </div>
      <div class="phone-number">015 99-1234567</div>
    </div>

    <div class="navbar-container__actions">
      <NuxtLink v-if="authStore.isAuth" :to="`/account/${authStore.user.id}`">
        <div class="navbar-container__actions__account">
          <img src="../../static/icons/user_default.svg" alt="user's profile icon">
        </div>
      </NuxtLink>
      <NuxtLink v-if="!authStore.isAuth && !isLoading" to="/auth">
        <BaseButton :type="loginType">LogIn</BaseButton>
      </NuxtLink>
      <BaseButton
        v-else-if="authStore.isAuth && !isLoading"
        type="base"
        @click="logOut"
        >LogOut</BaseButton
      >
      <NuxtLink v-if="!authStore.isAuth && !isLoading" to="/registration">
        <BaseButton :type="registrationType">Registration</BaseButton>
      </NuxtLink>
      <NuxtLink v-if="authStore.isAdminOrRedactor" to="/dashboard">
        <BaseButton type="danger">Dashboard</BaseButton>
      </NuxtLink>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import { computed, ref, onMounted } from "vue";
import BaseButton from "../BaseButton/BaseButton.vue";
import { useAuthStore } from "~/modules/AuthorizationForm/store/AuthStore";
import { navigateTo, useNuxtApp } from "#app";

// Todo: show user icon in the very right corner of navbar (as well as ability to go to user page)en dashboard appears again

const context = useNuxtApp();
const router = new useRouter();
const authStore = useAuthStore();
const isLoading = ref(true);
onMounted(async () => {
  await authStore.checkAuth();
  isLoading.value = false;
});
const isSignInPage = computed(() => {
  return router.currentRoute.value.name === "auth";
});
const isRegistrationPage = computed(() => {
  return router.currentRoute.value.name === "registration";
});
const registrationType = computed(() => {
  return isRegistrationPage.value ? "base" : "neutral";
});
const loginType = computed(() => {
  return isSignInPage.value ? "base" : "success";
});
const props = defineProps({
  showMenu: {
    type: Boolean,
    default: true,
  },
});
const city = ref("Munich");
const change = ref(false);
const logOut = async () => {
  await context.$api.auth.logout();
  await navigateTo({ path: "/products" });
  authStore.setIsAuth(false);
};
</script>
<style lang="scss">
.navbar-container {
  display: flex;
  width: 100%;
  height: 80px;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;
  background-color: #fff;
  border-bottom: 1px solid #ededed;
  padding: 20px;
  &__menu {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    &-item {
      list-style: none;
      display: flex;
      align-items: center;
      position: relative;
      font-weight: 700;
      color: #70544f;
      line-height: 1.33;
      height: 100%;
      a {
        text-decoration: none;
        color: inherit;
      }
    }
  }
  &__actions {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 30%;
    &__account {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      margin-right: 16px;
      border-radius: 8px;
      cursor: pointer;
      img {
        width: 90%;
        height: 90%;
        border-radius: 50%;
        background-color: #E8EDF2;
      }
    }
  }
}
.logo img {
  width: 100px;
  height: 40px;
}

.language-option {
  margin: 0 0 0 0;
}

.phone-number {
  display: flex;
  align-items: center;
  min-width: fit-content;
  text-transform: uppercase;
  font-weight: 700;
  color: #70544f;
  line-height: 1.33;
  height: 100%;
  margin: 0 30px;
}
.user-account-section {
  position: relative;
  width: 100px;
  height: 50px;
  margin: 0 10px 0 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  color: #006d54;
  padding: 10px;
  border-radius: 25px;
  background-color: whitesmoke;
  font-weight: 700;
}
.user-section-active {
  background-color: #f8f8f8;
  color: #bfb7b6;
}
button {
  cursor: pointer;
}
</style>
