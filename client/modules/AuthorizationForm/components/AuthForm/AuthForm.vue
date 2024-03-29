<template>
  <div class="auth">
    <h4>User {{ label }} form</h4>
    <div class="auth__form-items">
      <BaseInput
        v-if="byPhone"
        id="phone-registration"
        v-model="phone"
        label="Phone"
        type="phone"
        placeholder="enter phone number"
      />
      <BaseInput
        v-else
        id="email"
        v-model="email"
        label="Email"
        type="email"
        placeholder="enter email"
      />
      <BaseInput
        id="password-registration"
        v-model="password"
        label="Password"
        type="password"
        placeholder="enter password 8 characters, numbers symbols and letters required"
      />
    </div>
    <div class="action-section">
      <button
        type="button"
        class="bg-[gray] text-white m-2 px-3 py-2 rounded-md text-sm text-white"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="bg-[#12b488] text-white m-2 px-3 py-2 rounded-md text-sm text-white"
        @click="handleClick"
      >
        {{ label }}
      </button>
    </div>
    <div class="action-section">
      <div>{{ readdressMessage }}</div>
      <NuxtLink :to="`/${link}`">{{ oppositeLabel }}</NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import BaseInput from "~/components/BaseInput/BaseInput.vue";

import { navigateTo, useNuxtApp } from "#app";
import { useAuthStore } from "~/modules/AuthorizationForm/store/AuthStore";

const context = useNuxtApp();
const props = defineProps({
  label: {
    required: true,
    type: String,
  },
  byPhone: {
    default: false,
    type: Boolean,
  },
  link: {
    default: "",
    type: String,
  },
});

const router = new useRouter();
const { setIsAuth, setUser } = useAuthStore();
const isLogin = computed(() => {
  return router.currentRoute.value.name === "auth";
});
const data = ref({});
const email = ref<string>("");
const password = ref<string>("");
const phone = ref<string>("");

const oppositeLabel = computed(() => {
  return props.label === "registration" ? "LogIn" : "Registration";
});
const handleClick = async () => {
  // todo: add validation for empty email/password for the both cases
  // Todo: make a loader for retrieving loading from api;
  //  todo: move the api calls below to the pinia store
  if (!isLogin.value) {
    data.value = await context.$api.auth.registration(
      email.value,
      password.value
    );
  } else {
    data.value = await context.$api.auth.login(email.value, password.value);
  }
  await setUser(data.value);
  setIsAuth(true);
  await navigateTo({ path: "/products" });
};

const readdressMessage = computed(() => {
  return props.label === "registration"
    ? "Already registered? "
    : "Have no account yet?";
});
</script>

<style lang="scss" scoped>
.auth {
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 100%;
  align-items: center;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  padding: 3% 5%;
  &__form {
    justify-content: center;
    padding: 32px;
    border-radius: 4px;
    width: 100%;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
    &-items {
      width: 100%;
    }
  }
}
.action-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 30%;
  margin-bottom: 16px;
  a {
    margin: 0 16px;
  }
  button {
    cursor: pointer;
  }
  button[type="submit"] {
    background-color: #12b488;
  }
}
</style>
