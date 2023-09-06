<template>
  <Input
    :id="size.id"
    v-model="price"
    type="number"
    placeholder="enter price"
    :disabled="confirmed || previousPrice"
    :value="previouslySetPrice"
  />
  <AddButton v-if="!confirmed && !previousPrice" @proceed="confirm">
    Confirm
  </AddButton>
  <Button v-else type="warning" @click="resetPrice"> Redact </Button>
  <RemoveButton :elem-id="size.id" @removeItem="removeItem" />
</template>

<script lang="ts" setup>
import { computed, PropType, ref, watch } from "vue";
import Input from "~/components/Input/Input.vue";
import AddButton from "~/components/AddButton/AddButton.vue";
import RemoveButton from "~/components/RemoveButton/RemoveButton.vue";
import { IOptions } from "~/components/types";

const props = defineProps({
  size: {
    type: Object as PropType<IOptions>,
    required: true,
  },
  previousPrice: {
    type: [Number],
  },
});
const emit = defineEmits(["confirm", "remove", "reset"]);
const confirmed = ref(false);
const price = ref<number>();
const previouslySetPrice = computed(() => {
  return props.previousPrice ? props.previousPrice : 0;
});
const confirm = () => {
  const priceObj = {
    id: props.size.id,
    value: Number(price.value),
  };
  emit("confirm", priceObj);
  confirmed.value = true;
};
const removeItem = (id) => {
  emit("remove", id);
};
const resetPrice = () => {
  confirmed.value = false;
  emit("reset", props.size.id);
};
watch(price, (newVal) => {
  if (newVal) {
    confirmed.value = false;
  }
});
</script>

<style lang="scss" scoped>
.add-button {
  margin-bottom: 0px;
}
.warning {
  margin-right: 16px;
}
</style>
