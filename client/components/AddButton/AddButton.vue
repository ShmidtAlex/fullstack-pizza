<template>
  <div
      class="add-button"
      :class="{'disabled': disabled}"
      @click="proceedAddition"
  >Add +</div>
</template>

<script lang="ts" setup>
  const props = defineProps({
    disabled: {
      type: Boolean,
      default: false
    }
  })
  const emit = defineEmits(['proceedAddition'])
  const proceedAddition = () => {
    if (!props.disabled) {
      emit('proceedAddition')
    }
  }

</script>

<style lang="scss" scoped>
  .add-button {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: rgba(0,128,0, 0.9);
    width: 80px;
    height: 40px;
    border-radius: 8px;
    margin: 0 16px 16px 0;
    cursor: pointer;
    &.disabled {
      background-color: rgba(0,0,0, 0.3);
      cursor: auto;
      &:hover {
        box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.3);
      }
    }
    &:hover {
      box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.3);
    }
  }
</style>