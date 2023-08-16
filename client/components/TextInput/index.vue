<template>
  <div v-if="isShown" class="form-input">
    <label>{{ label }}</label>
      <input
        v-model="text"
        :name="name"
        :type="type"
        class="form-input__item"
        :placeholder="placeholder"
      />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps({
  isShown: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: 'enter your'
  }
});
  const text = ref('')
</script>

<style lang="scss" scoped>
.form-input {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  label {
    padding-left: 8px;
    font-size: 14px;
    margin-bottom: 4px;
    font-weight: 500;
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
