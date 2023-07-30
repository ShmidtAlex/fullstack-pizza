<template>
  <div class="close-block">
    <div class="close-block__button" @click="close">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 14 14"
      >
        <path
          fill="white"
          fill-rule="evenodd"
          d="M8.41 7l4.95 4.95-1.41 1.41L7 8.41l-4.95 4.95-1.41-1.41L5.59 7 .64 2.05 2.05.64 7 5.59 11.95.64l1.41 1.41L8.41 7z"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["close"]);
const close = () => {
  emit("close");
};
</script>

<style lang="scss" scoped>
.close-block {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 40%;
  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
    width: 30px;
    height: 30px;
    background-color: darkred;
    border-radius: 50%;
    padding: 6px;
  }
}
</style>
