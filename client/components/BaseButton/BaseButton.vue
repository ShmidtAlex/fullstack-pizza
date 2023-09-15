<template>
  <div :class="localType" @click="emit('proceedAction')">
    <button>
      <slot></slot>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

export type TButtonsTypes =
  | "warning"
  | "danger"
  | "base"
  | "success"
  | "neutral";
const props = defineProps({
  type: {
    type: String as () => TButtonsTypes,
    default: "base",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
const localType = computed(() => {
  return props.disabled ? `${props.type} disabled` : props.type;
});
const emit = defineEmits(["proceedAction"]);
</script>

<style lang="scss" scoped>
@import "assets/css/buttons";
button {
  cursor: auto;
}
</style>
