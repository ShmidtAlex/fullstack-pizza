<template>
  <Input
      v-model="price"
      :id="size"
      type="number"
      placeholder="enter price"
      :disabled="confirmed"
  />
  <AddButton
      :disabled="!price || confirmed"
      @proceedAddition="confirm"
  >confirm</AddButton>
  <RemoveButton @removeItem="removeItem" :elem-id="size"/>
</template>

<script lang="ts" setup>

  import Input from "~/components/Input/Input.vue";
  import AddButton from "~/components/AddButton/AddButton.vue";
  import {ref, watch} from "vue";
  import RemoveButton from "~/components/RemoveButton/RemoveButton.vue";

  const props = defineProps({
    index: {
      type: Number,
      required: true
    },
    size: {
      type: [Number, String],
      required: true
    }
  })
  const emit = defineEmits(['confirm', 'remove'])
  const confirmed = ref(false)
  const price = ref<number | null>(null)
  const confirm = () => {
    const priceObj = {
      index: props.index,
      price: price.value
    }
    emit('confirm', priceObj)
    confirmed.value = true
  }
  const removeItem = () => {
    emit('remove', props.index)
  }
  watch(price, (newVal) => {
    if (newVal) {
      confirmed.value = false
    }
  })
</script>

<style lang="scss" scoped>
  .add-button {
    margin-bottom: 0px;
  }
</style>