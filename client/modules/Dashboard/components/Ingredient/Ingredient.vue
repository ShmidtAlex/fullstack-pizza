<template>
  <div class="ingredient">
    <div class="ingredient__info">
      <img :src="data.img" alt="">
      <div class="ingredient__info__name">{{ data.name }}</div>
      <div class="ingredient__info__price">{{ data.price }}$</div>
    </div>
    <div class="ingredient__actions">
      <button
          class="bg-[crimson] m-1 px-3 py-2 rounded-md text-sm text-white"
          @click="remove"
      >Remove ingredient</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
   import { IIngredientModel } from "~/modules/Dashboard/types";
   import { PropType } from "vue";

   const props = defineProps({
     data: {
       type: Object as PropType<IIngredientModel>,
       required: true
     }
   })
   const emit = defineEmits(['remove'])
   const remove = () => {
     emit('remove', props.data.id)
   }
</script>

<style lang="scss" scoped>
  .ingredient {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 8px;
    margin-bottom: 16px;
    border-radius: 8px;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.3);
    &__info {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      width: 50%;
    }
  }
</style>