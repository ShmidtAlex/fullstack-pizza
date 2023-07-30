<template>
  <div class="sign-in">
    User sign in form
    <VForm
      v-slot="{ meta: formMeta, errors: formErrors }"
      class="sign-in__form"
      :validation-schema="schema"
      :inital-values="initialValues"
      @submit="handleSubmit"
    >
      <div class="sign-in__form-items">
        <text-input name="phone" :is-shown="registerByPhone"></text-input>
        <text-input
          label="Email"
          type="email"
          name="email"
          :is-shown="!registerByPhone"
        ></text-input>
        <text-input name="password" :is-shown="true"></text-input>
      </div>
      <section class="action-section">
        <button type="button" class="sign-out">Sign Out</button>
        <button type="submit" class="btn">Sign In</button>
      </section>
    </VForm>
  </div>
</template>
<script setup>
import * as yup from "yup";
import { configure } from "vee-validate";
import TextInput from "../../../components/TextInput/TextInput.vue";

const registerByPhone = false;
const isRequired = (value) => {
  if (!!value && value.trim()) {
    return true;
  }
  return "this field is required";
};
const handleSubmit = (values, actions) => {
  actions.resetForm();
};
// we also need it only for registration purposes, not for sing in
// Todo: move it to registration form
// const existingEmail = async (value) => {
//   const result = await $fetch("/api/check-email?email=" + value);
//   23px
//   return result ? true : false;
// };

configure({
  validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
  validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
  validateOnInput: false, // controls if `input` events should trigger validation with `handleChange` handler
  validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
});
const schema = yup.object({
  email: yup
    .string()
    .required()
    .email()
    // this is actually for sign up form, we verify if the email already exists in database (emulated in /api/check-emails.js)
    // Todo: move it to registration form
    // .test(
    //     "email-is-taken",
    //     "Email is already taken",
    //     async (value) => !(await existingEmail(value))
    // )
    .label("Email Address"),
  password: yup.string().required().min(8).label("Your Password"),
  confirmed: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords do not match") // Cross-Field Validation
    .label("Your Confirmation Password"),
});
const initialValues = { email: "", password: "", confirmed: "" };
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
