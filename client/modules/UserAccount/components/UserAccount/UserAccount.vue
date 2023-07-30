<template>
  <UserSignInForm />
  <UserRegistrationForm />
</template>
<script>
import UserSignInForm from "../../../AuthorizationForm/pages/UserSignInForm.vue";
import UserRegistrationForm from "../../../RegistrationForm/components/Form/UserRegistrationForm.vue";

export default {
  components: {
    UserSignInForm,
    UserRegistrationForm,
  },
  props: {
    isActive: {
      type: Boolean,
    },
  },
  methods: {
    // closeMenu: function(value) {
    //
    //   this.$emit('closeMenu', value);
    // }
  },
};
</script>
<style>
.user-account-wrapper {
  width: fit-content;
  height: fit-content;
  position: absolute;
  top: 90px;
  right: 40px;
}
.sign-in-block_hidden {
  visibility: hidden;
  /*position: absolute;*/
  /*transition: visibility 1s ease-in-out;*/
  width: 350px;
  height: 350px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 5px;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.3);
}
.sign-in-block_visible {
  visibility: visible;
}
</style>
