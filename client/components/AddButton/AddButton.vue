<template>
  <div class="add-button" @click="proceedAddition">Add +</div>
</template>

<script lang="ts" setup>
  const emit = defineEmits(['proceedAddition'])
  const proceedAddition = () => {
    emit('proceedAddition')
  }

</script>

<style lang="scss" scoped>
  .add-button {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: rgba(0,128,0, 0.9);
    width: 80px;
    height: 40px;
    border-radius: 8px;
    margin: 0 16px 16px 0;
  }
</style>