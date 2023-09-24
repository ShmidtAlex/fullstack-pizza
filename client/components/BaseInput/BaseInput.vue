<template>
  <div v-if="value" class="base-input">
    <label
      v-if="label"
      :for="`value-${id}`"
      class="form-label text-sm font-medium"
      >{{ label }}</label
    >
    <input
      :id="`value-${id}`"
      :type="type"
      class="form-control form-control-md"
      name="a"
      :placeholder="placeholder"
      min="0"
      :value="value"
      :disabled="disabled"
      @input="update"
    />
  </div>
  <div v-else class="base-input">
    <label
      v-if="label"
      :for="`id-${id}`"
      class="form-label text-sm font-medium"
      >{{ label }}</label
    >
    <input
      :id="`id-${id}`"
      :type="type"
      class="form-control form-control-md"
      name="b"
      min="0"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="changeString"
    />
  </div>
</template>
<!-- Todo: prevent negative numbers -->
<script setup lang="ts">
import { PropType } from "vue";

type InputTypes = "email" | "password" | "text" | "number" | "search" | "tel";
const props = defineProps({
  type: {
    required: true,
    type: String as PropType<InputTypes>,
  },
  id: {
    required: true,
    type: [String, Number],
    default: "a",
  },
  placeholder: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  value: {
    required: false,
    type: [String, Number],
    default: "",
  },
});

const emit = defineEmits(["update:modelValue", "change"]);
const changeString = (e) => {
  emit("update:modelValue", e.target.value);
};
const update = (e) => {
  emit("change", e.target.value);
};
</script>

<style lang="scss" scoped>
.base-input {
  margin: 0 16px 16px 0;
  min-width: fit-content;
  input {
    background-color: white;
    &::placeholder {
      color: lightgray;
    }
  }
}
</style>
