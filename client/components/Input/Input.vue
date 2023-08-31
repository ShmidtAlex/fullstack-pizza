<template>
  <div v-if="value" class="input">
    <!--    Todo: prevent negative values for input type number -->
    <label
        v-if="label"
        :for="`value-${id}`"
        class="form-label text-sm font-medium"
    >{{ label }}</label>
    <input
        @input="update"
        :type="type"
        class="form-control form-control-sm"
        :id="`value-${id}`"
        name="a"
        :placeholder="placeholder"
        :value="value"
        :disabled="disabled"
    >
  </div>
  <div v-else class="input">
    <!--    Todo: prevent negative values for input type number -->
    <label
        v-if="label"
        :for="`id-${id}`"
        class="form-label text-sm font-medium"
    >{{ label }}</label>
    <input
        @input="changeString"
        :type="type"
        class="form-control form-control-sm"
        :id="`id-${id}`"
        name="b"
        :placeholder="placeholder"
        :disabled="disabled"
    >
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
      type: [String, Number],
      default: 'a'
    },
    placeholder: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // Todo if ingredient creation works well after adding this props
    value: {
      required: false,
      type: [String, Number],
      default: ''
    }
  })

  const emit = defineEmits(['update:modelValue', 'change']);
  const changeString = (e) => {
    emit('update:modelValue', e.target.value);
  };
  const update = (e) => {
    emit('change', e.target.value)
  }
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