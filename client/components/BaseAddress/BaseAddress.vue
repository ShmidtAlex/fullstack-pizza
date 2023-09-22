<template>
  <div class="address">
    <div class="address__content">
      <BaseInput />
      <BaseInput></BaseInput>
      <BaseInput></BaseInput>
      <BaseInput></BaseInput>
    </div>
    <div class="address__actions">
      <BaseButton>Cancel</BaseButton>
      <BaseButton>Confirm</BaseButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  label: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['click'])

</script>

<style lang="scss" scoped>

</style>
