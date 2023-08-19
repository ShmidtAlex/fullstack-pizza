<template>
  <div class="ingredient">
    <div v-if="!redactMode" class="ingredient__info">
      <div class="ingredient__info__img">
        <img :src="`${config.public.NUXT_ENV_BASE_URL}/${data.img}`" :alt="`image of ingredient ${data.name}`">
      </div>
      <div class="ingredient__info__name">{{ data.name }}</div>
      <div class="ingredient__info__price">{{ data.price }}$</div>
    </div>
    <div v-else class="ingredient__redact">
      <div class="ingredient__redact__img">
        <img :src="`${config.public.NUXT_ENV_BASE_URL}/${data.img}`" :alt="`image of ingredient ${data.name}`">
      </div>
      <div class="ingredient__redact__name">
        <Input type="text" :value="data.name" @change="(value) => update(value, 'name') " />
      </div>
      <div class="ingredient__redact__price">
        <Input type="number" :value="data.price" @change="(value) => update(value, 'price')" />$
      </div>
    </div>
    <div v-if="!isRedactor" class="ingredient__actions">
      <button
          class="bg-[crimson] m-1 px-3 py-2 rounded-md text-sm text-white"
          @click="remove"
      >Remove ingredient</button>
    </div>
    <div v-else class="ingredient__actions">
      <button
          v-if="!redactMode"
          class="ingredient__actions--redact m-1 px-3 py-2 rounded-md text-sm text-white"
          @click="redactMode = true"
      >Change ingredient</button>
      <button
          v-else
          class="ingredient__actions--activate m-1 px-3 py-2 rounded-md text-sm text-white"
          @click="redact"
      >Apply changes</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
   import { IIngredientModel } from "~/modules/Dashboard/types";
   import {computed, PropType, reactive, ref} from "vue";
   import { useRuntimeConfig } from "#app";
   import {useAuthStore} from "~/modules/AuthorizationForm/store/AuthStore";

   const redactMode = ref<boolean>(false);
   const authStore = useAuthStore()
   const props = defineProps({
     data: {
       type: Object as PropType<IIngredientModel>,
       required: true
     }
   })
   const config = useRuntimeConfig();
   const isRedactor = computed(() => {
     return authStore.user.role === 'REDACTOR'
   })
   const redactedIngredient = reactive<Partial<IIngredientModel>>({
     name: '',
     price: ''
   })
   const emit = defineEmits(['redact'])
   const remove = () => {
     emit('remove', props.data.id)
   }
   const update = (value,field) => {
     redactedIngredient[field] = value
   }
   const redact = () => {
     redactMode.value = true
     emit('redact', { ingredientId: props.data.id, redactedIngredient: redactedIngredient });
     redactMode.value = false
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
      // Todo: minimize pictures, as they are still to big
      &__img {
        display: flex;
        justify-content: center;
        width: 60px;
        img {
          widht: 40px;
          height: 40px;
        }
      }
    }
    &__actions {
      &--redact {
        background-color: darkorange;
      }
      &--activate {
        background-color: rgba(0, 128, 0, 0.9);
      }
    }
    &__redact {
      @extend .ingredient__info;
      width: 60%;
      &__img {
        display: flex;
        justify-content: center;
        min-width: 60px;
        margin-right: 16px;
        img {
          widht: 40px;
          height: 40px;
        }
      }
      .input {
        margin: 0 16px 0 0;
      }
      &__price {
        display: flex;
        justify-content: center;
        align-items: center;
        //max-width: fit-content;
      }
      &__name {
        @extend .ingredient__redact__price;
        min-width: 110px;
      }
    }
  }
</style>