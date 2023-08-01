<template>
  <div class="sign-in">
    <!--  Todo: add bootstrap and do all forms on bootstrap -->
    <!--  Todo: add the same form as for login -->
    <!--  Todo: adding roles should be able as separate operation from dashboard with superAdminRole-->
    User registration form
    <div class="sign-in__form-items">
      <input name="phone" v-show="registerByPhone" />
      <input
          label="Email"
          type="email"
          name="email"
          :is-shown="!registerByPhone"
      />
      <input name="password" :is-shown="true" />
    </div>
    <section class="action-section">
      <button
          type="button"
          class="bg-[gray] text-white m-2 px-3 py-2 rounded-md text-sm text-white"
      >
        Cancel
      </button>
      <button type="submit" class="btn">Sign In</button>
    </section>
  </div>
</template>
<script lang="ts" setup>
const registerByPhone = false;
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
    }
  }
}
.action-section {
  flex-direction: row;
  align-items: center;
  height: 30%;
}
</style>