<template>
  <div class="plug">
    <div class="info">There is no {{ itemName }} here yet</div>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps({
    itemName: {
      type: String,
      default: ''
    }
  })
</script>

<style lang="scss" scoped>
  .plug {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
    color: #bfb7b6;
    height: 100%;
    width: 100%;
  }
</style>