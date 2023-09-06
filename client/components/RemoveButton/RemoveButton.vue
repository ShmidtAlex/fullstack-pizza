<template>
  <div class="remove" @click="emits('removeItem', elemId)">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 14 14"
    >
      <path
        fill="currentColor"
        fill-rule="evenodd"
        d="M8.41 7l4.95 4.95-1.41 1.41L7 8.41l-4.95 4.95-1.41-1.41L5.59 7 .64 2.05 2.05.64 7 5.59 11.95.64l1.41 1.41L8.41 7z"
      ></path>
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";

type TIds = number | string | null;
const emits = defineEmits(["removeItem"]);
const props = defineProps({
  elemId: {
    type: [Number, String] as PropType<TIds>,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.remove {
  display: flex;
  justify-content: center;
  justify-self: flex-end;
  cursor: pointer;
}
</style>
