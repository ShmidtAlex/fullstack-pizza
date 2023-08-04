<template>
  <div class="mb-3">
    <label :for="id" class="form-label">{{ label }}</label>
    <input @change="changeString" :type="type" class="form-control form-control-sm" :id="id" :placeholder="placeholder">
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
  const emit = defineEmits(['change'])
  const changeString = (e) => {
   emit('change', e.target.value)
  }
</script>

<style lang="scss" scoped>
  input {
    &::placeholder {
      color: lightgray;
    }
  }
</style>