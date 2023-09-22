<template>
  <div class="item">
    <div class="item__pic--small">
      <!--      Todo: alt matching should be moved to computed -->
      <img
        :src="`${config.public.NUXT_ENV_BASE_URL}static/${unit.smallImg}`"
        :alt="unit.smallImg.match(/^([^.]+)/)"
      />
    </div>
    <div class="item__info">
      <div class="item__info_name">{{ unit.pizzaName }}</div>
      <div v-if="isExcluded" class="item__info_details">
        <CartUnitIngredients :unit="unit" />
      </div>
      <div v-if="isAddons" class="item__info_details">
        <CartUnitAddons :unit="unit" />
      </div>
      <div class="item__info_name">
        <i>{{ unit.pizzaSize }} cm {{ unit.pizzaType.value }}</i>
      </div>
    </div>
    <RemoveButton :elem-id="unit.id" @remove-item="removeItem" />
  </div>
  <div class="item__info">
    <CartUnitCountManager
      :unit="unit"
      @decrease-number="decreaseNumber({ id: unit.id })"
      @increase-number="increaseNumber({ id: unit.id })"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from "vue";
import { IFinalObjectForCart } from "~/modules/Products/types";
import { useProductsStore } from "~/modules/Products/store/ProductsStore";
import CartUnitIngredients from "~/modules/Products/components/CartUnit/CartUnitIngredients.vue";
import CartUnitAddons from "~/modules/Products/components/CartUnit/CartUnitAddons.vue";
import RemoveButton from "~/components/RemoveButton/RemoveButton.vue";
import { useRuntimeConfig } from "#app";

const props = defineProps({
  unit: {
    type: Object as PropType<IFinalObjectForCart>,
    required: true,
  },
});
const config = useRuntimeConfig();
const { removeItem, increaseNumber, decreaseNumber } = useProductsStore();
const isAddons = computed(() => {
  return Object.keys(props.unit.extraAddons).length;
});
// Todo: replace prop chain with inject tool
const isExcluded = computed(() => {
  return props.unit.excludedIngredients.length;
});
</script>

<style lang="scss" scoped>
.item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  &__pic--small {
    position: relative;
    width: 40px;
    height: 30px;
    img {
      position: absolute;
      max-width: 100%;
      height: auto;
      top: 0;
      left: 0;
    }
  }
  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding-left: 5px;
    &_name {
      width: 100%;
      height: 18px;
      font-size: 11px;
      font-weight: 700;
      min-height: fit-content;
    }
    &_details {
      width: 100%;
      font-size: 11px;
      font-weight: 400;
    }
  }
}
</style>
