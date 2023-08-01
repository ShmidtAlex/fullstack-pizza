<template>
  <div v-if="isShown" class="form-input w-full">
    <label>{{ name.toUpperCase() }}</label>
    <VField v-slot="{ field, meta, errors }" :name="name">
      <input
        v-bind="field"
        :name="name"
        :type="type"
        :field="field"
        class="form-input__item w-full"
        :class="{
          'form-input__item-success': meta.valid && meta.touched,
          'form-input__item-warning': !meta.valid && meta.touched,
        }"
        :placeholder="`enter your ${name}`"
      />
    </VField>
    <div class="form-input__error">
      <VErrorMessage :name="name" class="text-red-800 w-full font-light" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isShown: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
});
let isBorder = false;
const isRequired = (value) => {
  if (value && value.trim()) {
    return true;
  }
  isBorder = true;
  return "this field is required";
};
</script>

<style lang="scss" scoped>
.form-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 30%;

  label {
    margin-bottom: 8px;
  }
  &__item {
    min-height: 40px;
    border-radius: 4px;
    padding: 0 16px;
    border: 1px solid lightgray;
    &-warning {
      border: 1px solid crimson;
    }
    &-success {
      border: 1px solid seagreen;
    }
  }
  .form-input__error {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    font-size: 14px;
    height: 45px;
    padding-left: 16px;
  }
}
</style>
