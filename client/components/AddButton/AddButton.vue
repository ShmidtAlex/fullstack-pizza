<template>
  <BaseButton
    :type="type"
    class="add-button"
    :disabled="disabled"
    @click="proceed"
    ><slot></slot
  ></BaseButton>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import BaseButton from "../BaseButton/BaseButton.vue";

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});
const type = computed(() => {
  return props.disabled ? "base" : "success";
});
const emit = defineEmits(["proceed"]);
const proceed = () => {
  if (!props.disabled) {
    emit("proceed");
  }
};
</script>

<style lang="scss" scoped>
.add-button {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  min-width: fit-content;
  height: 40px;
  margin: 0 16px 16px 0;
}
</style>
