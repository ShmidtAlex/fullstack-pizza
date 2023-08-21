<template>
  <div :class="type">
    <button @click="emit('proceedAction')">
      <slot></slot>
    </button>
  </div>

</template>

<script lang="ts" setup>
  type TButtonsTypes = ['warning', 'danger', 'btn']
  const props = defineProps({
    type: {
      type: String as () => TButtonsTypes,
      default: 'btn'
    }
  })
  const emit = defineEmits(['proceedAction'])
</script>

<style lang="scss" scoped>
 @import "assets/css/buttons";
</style>