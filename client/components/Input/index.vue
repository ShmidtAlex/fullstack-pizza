<template>
  <div class="input">
    <label v-if="label" :for="id" class="form-label text-sm font-medium">{{ label }}</label>
    <input v-if="value" @input="changeString" :type="type" class="form-control form-control-sm" :id="id" :placeholder="placeholder" :value="value">
    <input v-else @input="changeString" :type="type" class="form-control form-control-sm" :id="id" :placeholder="placeholder">
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
    },
    // Todo if ingredient creation works well after adding this props
    value: {
      required: false,
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
    margin: 0 16px 16px 0;
    min-width: fit-content;
    input {
      &::placeholder {
        color: lightgray;
      }
    }
  }

</style>