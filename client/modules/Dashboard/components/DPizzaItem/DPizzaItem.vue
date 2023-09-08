<template>
  <div class="pizza">
    <AddPizza
      mode="update"
      :id="data.id"
      :pizza="data"
      :ingredient-select-mode="true"
    />
  </div>
</template>

<script lang="ts" setup>
  import {PropType} from "vue";
  import {IPizzaModel} from "~/modules/Dashboard/types";

  const props = defineProps({
    data: {
      type: Object as PropType<IPizzaModel>,
      required: true
    },
    pizzaUpdating: {
      type: Boolean,
      default: false
    }
  })
</script>

<style lang="scss" scoped>
  .pizza {
    border-bottom: 1px solid lightgrey;
    &:last-child {
      border-bottom: none;
    }
  }
</style>