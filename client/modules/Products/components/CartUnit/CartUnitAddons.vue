<template>
  <div
    v-for="(addon, addonKey) in unit.extraAddons"
    :key="addonKey"
    class="extra"
  >
    <div class="extra__info">
      <span>{{ addonKey }}</span>
    </div>
    <div class="extra__actions">
      <CartUnitCountManager
        :unit="{ quantity: addon.count }"
        @increase-number="increaseNumber({ id: unit.id, fieldName: addonKey })"
        @decrease-number="decreaseNumber({ id: unit.id, fieldName: addonKey })"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IFinalObjectForCart } from "~/modules/Products/types";
import CartUnitCountManager from "~/modules/Products/components/CartUnit/CartUnitCountManager.vue";
import { useProductsStore } from "~/modules/Products/store/ProductsStore";

const props = defineProps<{
  unit: IFinalObjectForCart;
}>();
const { increaseNumber, decreaseNumber } = useProductsStore();
</script>

<style lang="scss" scoped>
.extra {
  font-size: 11px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  color: #009471;
  &__actions {
    width: 50%;
  }
}
@media screen and (max-width: 540px) and (min-width: 415px) and (orientation: portrait) {
  .extra {
    width: 30%;
  }
}
</style>
