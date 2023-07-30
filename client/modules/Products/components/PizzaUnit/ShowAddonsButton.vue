<template>
  <div class="addons-list">
    <button class="addons-list__button" @click="showAddonInUnit">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="12"
        viewBox="0 0 16 12"
      >
        <path
          fill="currentColor"
          fill-rule="evenodd"
          d="M1 0h14a1 1 0 0 1 0 2H1a1 1 0 0 1 0-2zm2 5h10a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm2 5h6a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2z"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script lang="ts" setup>
// Todo: add unit-tests

const emit = defineEmits(["showAddon"]);
const showAddonInUnit = () => {
  emit("showAddon");
};
</script>

<style lang="scss" scoped>
.addons-list {
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  z-index: 1;
  &__button {
    width: 32px;
    height: 32px;
    border: 1px solid rgba(0, 148, 113, 0.2);
    border-radius: 50%;
    background-color: #fff;
    color: #009471;
    -webkit-transition: border-color 0.35s;
    transition: b;
    padding: 2px 0 0 0;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    &:after {
      content: "";
      position: absolute;
      top: -16px;
      right: -16px;
      bottom: -16px;
      left: -16px;
    }
  }
}
</style>
