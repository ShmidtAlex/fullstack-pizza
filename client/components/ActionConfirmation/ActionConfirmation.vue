<template>
  <div class="confirmation">
    <div class="confirmation__message">Are you sure you want to {{ actionName }}?</div>
    <div class="confirmation__action">
      <Button @proceedAction="emit('cancel')">Cancel</Button>
      <Button type="danger" @proceedAction="emit('confirm')">Still {{ actionName }}</Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps({
    actionName: {
      type: String,
      default: 'do this'
    }
  })
  const emit = defineEmits(['cancel', 'confirm'])
</script>

<style lang="scss" scoped>
  .confirmation {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: white;
    padding: 16px 0;
    &__message {
      padding: 16px;
    }
    &__action {
      display: flex;
      justify-content: space-around;
      width: 50%;
      height: fit-content;
    }
  }
</style>