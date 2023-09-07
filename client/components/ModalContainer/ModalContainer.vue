<template>
  <div class="modal">
    <div class="modal__header">
      {{ title }}
      <RemoveButton @remove-item="emit('close')"></RemoveButton>
    </div>
    <div class="modal__body" :class="{ 'modal__body--with-footer': isFooter }">
      <slot></slot>
    </div>
    <div v-if="isFooter" class="modal__footer">footer</div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  isFooter: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(["close"]);
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
    width: 60%;
    height: 60px;
    padding: 16px 24px;
    background-color: white;
    border-radius: 8px 8px 0px 0px;
    margin-bottom: -1px;
  }
  &__body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60%;
    height: auto;
    min-height: fit-content;
    border-radius: 0 0 8px 8px;
    background-color: white;
    padding: 16px 24px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    &--with-footer {
      border-radius: 0 0 0 0;
    }
  }
  &__footer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
    height: 60px;
    padding: 16px;
    background-color: white;
    border-radius: 0 0 8px 8px;
  }
}
</style>
