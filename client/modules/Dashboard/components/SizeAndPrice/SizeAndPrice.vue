<template>
  <div class="label">{{ label }}</div>
  <div v-for="(size, index) in sizes" :key="index" class="price">
    <div class="price__item">{{ size }} cm</div>
    <Price
        :index="index"
        :size="size"
        @confirm="confirm"
        @remove="removeSizeAndPrice"
    />
  </div>
</template>

<script lang="ts" setup>
  import { PropType } from "vue";
  import Price from "../Price/Price.vue";

  const props = defineProps({
    sizes: {
      type: Array as PropType<number[]>,
      default: () => []
    },
    label: {
      type: String,
      default: ''
    }
  })
  const emit = defineEmits(['confirm', 'remove'])
  const confirm = (data) => {
    emit('confirm', data)
  }
  const removeSizeAndPrice = (index) => {
    emit('remove', index)
  }

</script>

<style lang="scss" scoped>
  .label {
    margin-bottom: 8px;
  }
  .price {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 8px 16px;
    border-radius: 8px;
    margin-bottom: 8px;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.3);
    &__item {
      display: flex;
      align-items: center;
      width: 50px;
      min-width: fit-content;
      height: 32px;
      margin-right: 16px;
    }
    :deep .input, .add-button {
      margin-bottom: 0px;
    }
  }
</style>