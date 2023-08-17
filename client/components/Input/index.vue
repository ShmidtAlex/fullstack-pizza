<template>
  <div class="input mb-3">
    <label :for="id" class="form-label text-sm font-medium">{{ label }}</label>
    <input @input="changeString" :type="type" class="form-control form-control-sm" :id="id" :placeholder="placeholder">
  </div>
</template>
<!-- Todo: prevent negative numbers -->
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

  const emit = defineEmits(['update:modelValue']);
  const changeString = (e) => {
    emit('update:modelValue', e.target.value);
  };
</script>

<style lang="scss" scoped>
  .input {
    margin-right: 16px;
    input {
      &::placeholder {
        color: lightgray;
      }
    }
  }

</style>