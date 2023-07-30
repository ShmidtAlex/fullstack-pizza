<template>
  <div
    v-for="ingredient in props.unit.excludedIngredients"
    :key="ingredient"
    class="removed"
  >
    - {{ ingredient }}
  </div>
</template>

<script lang="ts" setup>
import { IFinalObjectForCart } from "~/modules/Products/types";

const props = defineProps<{
  unit: IFinalObjectForCart;
}>();
</script>

<style lang="scss" scoped>
.removed {
  color: darkred;
}
</style>
