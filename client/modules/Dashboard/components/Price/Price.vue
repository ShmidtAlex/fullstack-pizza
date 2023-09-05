<template>
  <Input
      v-model="price"
      :id="size.id"
      type="number"
      placeholder="enter price"
      :disabled="confirmed"
  />
  <AddButton
      v-if="!confirmed"
      @proceed="confirm"
  >
    Confirm
  </AddButton>
  <Button
      v-else
      type="warning"
      @click="confirmed = false"
  >
    Redact
  </Button>
  <RemoveButton @removeItem="removeItem" :elem-id="size.id"/>
</template>

<script lang="ts" setup>
  import Input from "~/components/Input/Input.vue";
  import AddButton from "~/components/AddButton/AddButton.vue";
  import {PropType, ref, watch} from "vue";
  import RemoveButton from "~/components/RemoveButton/RemoveButton.vue";
  import {IOptions} from "~/components/types";

  const props = defineProps({
    size: {
      type: Object as PropType<IOptions>,
      required: true
    }
  })
  const emit = defineEmits(['confirm', 'remove'])
  const confirmed = ref(false)
  const price = ref<number>()
  const confirm = () => {
    const priceObj = {
      id: props.size.id,
      value: Number(price.value)
    }
    emit('confirm', priceObj)
    confirmed.value = true
  }
  const removeItem = (id) => {
    emit('remove', id)
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
  .warning {
    margin-right: 16px;
  }
</style>