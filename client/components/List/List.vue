<template>
  <div class="list" :class="{'list--expanded': expand}">
    <div v-if="isLoading" class="list__loader">
      <span class="loader"></span>
    </div>
    <div class="list__plank" :class="{'list__plank--expanded': expand}" @click="toggleList">
      {{ title }}
    </div>
    <div class="list__content" :class="{'list__content--expanded': expand}">
      <slot v-if="expand"></slot>
    </div>
  </div>

</template>

<script lang="ts" setup>
  const props = defineProps({
    expand: {
      required: true,
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Elements List'
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  })
  const emit = defineEmits(['toggleList'])
  const toggleList = () => {
    emit('toggleList')
  }
</script>

<style lang="scss" scoped>
  .list {
    height: 80px;
    overflow-x: hidden;
    border-radius: 8px;
    padding: 2px;
    &__plank {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      font-weight: 500;
      width: 510px;
      min-width: 100%;
      position: relative;
      padding: 16px;
      border-radius: 8px;
      box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.3);
      transition: height 1s ease-in-out;
      margin-bottom: 16px;
      &::after {
        content: '';
        position: absolute;
        display: inline-block;
        top: 18px;
        right: 14px;
        width: 14px;
        height: 14px;
        border: 2px solid rgba(0,0,0, 0.6);
        border-top: none;
        border-left: none;
        transform: rotate(45deg);
        transition: transform 1s ease-in-out, top 1s ease-in-out;
        margin-left: 5px;
      }
      &--expanded {
        &::after {
          content: '';
          position: absolute;
          display: inline-block;
          top: 24px;
          right: 14px;
          width: 14px;
          height: 14px;
          border: 2px solid rgba(0,0,0, 0.6);
          border-top: none;
          border-left: none;
          transform: rotate(226deg);
          margin-left: 5px;
        }
      }
    }
    &__content {
      opacity: 0;
      transition: opacity 1s ease-in-out;
      min-width: fit-content;
      &--expanded {
        opacity: 1;
      }
    }
    &--expanded {
      overflow-x: visible;
      height: fit-content;
    }
  }

</style>