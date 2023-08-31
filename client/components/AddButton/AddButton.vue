<template>
  <Button
      :type="type"
      class="add-button"
      :disabled="disabled"
      @click="proceed"
  ><slot></slot></Button>
</template>

<script lang="ts" setup>
import Button from '~/components/Button/Button.vue';
import {computed} from "vue";

  const props = defineProps({
    disabled: {
      type: Boolean,
      default: false
    }
  })
  const type = computed(() => {
    return props.disabled ? 'base' : 'success'
  })
  const emit = defineEmits(['proceed'])
  const proceed = () => {
    if (!props.disabled) {
      emit('proceed')
    }
  }

</script>

<style lang="scss" scoped>
  .add-button {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    width: 80px;
    min-width: fit-content;
    height: 40px;
    margin: 0 16px 16px 0;
  }
</style>