<template>
  <div class="mb-3">
    <label :for="id" class="form-label">{{ label }}</label>
    <input :type="type" class="form-control form-control-sm" :id="id" :placeholder="placeholder">
  </div>
</template>

<script setup lang="ts">
  import { PropType } from "vue";

  type InputTypes = 'email' | 'password' | 'text' | 'number' | 'search' | 'tel'
  const props = defineProps({
    type: {
     required: true,
     type: String as PropType<InputTypes>
    },
    id: {
      required: true,
      type: String
    },
    placeholder: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  })
</script>

<style lang="scss" scoped>
  input {
    &::placeholder {
      color: lightgray;
    }
  }
</style>