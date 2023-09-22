<template>
  <div class="some-class">

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
