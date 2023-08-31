<template>
  <div class="select">
    <div class="select__title">{{ label }}</div>
    <div class="select__body" @blur="open = false">
      <div class="select__body--selected" :class="{ open: open }" @click="open = !open">
        {{ selectedSize }}
      </div>
      <div class="select__body__items" :class="{ selectHide: !open }">
        <div
            v-for="option of options"
            :key="option.value"
            @click="
          selectedSize = option.label;
          open = false;
          $emit('input', option);
        "
        >
          {{ option.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IOptions } from "~/components/types";
import { PropType, ref } from "vue";
 const props = defineProps({
   label: {
     type: String,
     default: ''
   },
   selectName: {
     type: String,
     required: true
   },
   options: {
     type: Array as PropType<IOptions[]>,
     required: true,
     default: () => []
   },
   multiple: {
     type: Boolean,
     default: false
   }
 })
  const emit = defineEmits(['input'])
  const open = ref(false);
  const selectedSize = ref<string | number>('')

  const closeDropdown = () => {
    open.value = false
  }
  // in order to make component methods available on composition API
  defineExpose({
    closeDropdown
  })
</script>

<style lang="scss" scoped>
.select {
  min-height: fit-content;
  &__title {
    margin-bottom: 8px;
  }
  &__body {
    position: relative;
    width: 160px;
    text-align: left;
    outline: none;
    height: 40px;
    line-height: 40px;
    margin-bottom: 16px;
    border-radius: 8px;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.3);
    transition: height .6s ease-in-out;
    &--selected {
      height: 100%;
      background-color: white;
      color: black;
      padding-left: 16px;
      border-radius: 8px;
      cursor: pointer;
      user-select: none;
      &.open {
        border-radius: 8px;
        &::after {
          top: 16px;
          transform: rotate(225deg);
        }
      }
      &::after {
        position: absolute;
        content: "";
        top: 10px;
        right: 14px;
        width: 14px;
        height: 14px;
        border: 2px solid rgba(0, 0, 0, 0.6);
        border-top: none;
        border-left: none;
        transform: rotate(45deg);
        transition: transform .6s ease-in-out, top .6s ease-in-out;
        margin-left: 5px;
      }
    }
    &__items {
      visibility: visible;
      color: black;
      border-radius: 8px;
      overflow: hidden;
      position: absolute;
      background-color: white;
      left: 0;
      right: 0;
      margin-top: 2px;
      box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.3);
      transition: visibility .6s ease-in-out;
      z-index: 1;
      div {
        color: black;
        padding-left: 16px;
        cursor: pointer;
        user-select: none;
        &:hover {
          background-color: lightgrey;
        }
      }
    }
    .selectHide {
      visibility: hidden;
    }
  }
}
</style>