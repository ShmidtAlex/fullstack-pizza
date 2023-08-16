<template>
  <div class="section">
    <div class="section__title">
      {{ title }}
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps({
    title: {
      type: String,
      default: ''
    }
  })
</script>

<style lang="scss" scoped>
.section {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: flex-start;
  width: 95%;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  &:hover {
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.3);
  }
  .section__title {
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 24px;
  }
}

</style>