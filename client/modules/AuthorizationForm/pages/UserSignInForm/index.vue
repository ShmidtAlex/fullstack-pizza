<template>
  <div class="sign-in">
    User sign in form
    <div class="sign-in__form-items">
      <input name="phone" v-if="signInByPhone" />
      <input
        label="Email"
        type="email"
        name="email"
        placeholder="enter email"
        v-else
      />
      <input
        name="password"
        placeholder="enter password"
      />
    </div>
    <section class="action-section">
      <button
        type="button"
        class="bg-[gray] text-white m-2 px-3 py-2 rounded-md text-sm text-white"
        @click="goToRegistrationPage"
      >
        Registration
      </button>
      <button type="submit" class="bg-[#12b488] text-white m-2 px-3 py-2 rounded-md text-sm text-white">Sign In</button>
    </section>
  </div>
</template>
<script lang="ts" setup>
  import {useRouter} from "vue-router";

  const signInByPhone = false;
  const router = useRouter();
  const goToRegistrationPage = function() {
    router.push({ name: "registration" })
  }
</script>
<style lang="scss" scoped>
* {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.sign-in {
  width: 100%;
  height: 100%;
  align-items: center;
  &__form {
    justify-content: center;
    padding: 32px;
    border-radius: 4px;
    width: 100%;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
    &-items {
      height: 200px;
      margin-bottom: 32px;
      input {
        border: 1px solid lightgray;
        border-radius: 4px;
      }
    }
  }
}
.action-section {
  flex-direction: row;
  align-items: center;
  height: 30%;
}
</style>
