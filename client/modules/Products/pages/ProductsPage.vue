<template>
  <div class="products">
    <div
      class="products-list"
      :class="{ 'products-list__collapsed': collapsed }"
    >
      <h1>Products Module Page</h1>
      <PizzasList />
    </div>
    <div class="cart-wrapper" :class="{ 'cart-wrapper__extended': collapsed }">
      <ProductCart />
    </div>
  </div>
</template>

<script lang="ts" setup>
// depending on the user's choice this page displays whether pizzas, combos, juice etc. Todo: insert other components
import { storeToRefs } from "pinia";
import PizzasList from "../components/PizzasList/PizzasList.vue";
import ProductCart from "../components/ProductCart/ProductCart.vue";
import { useProductsStore } from "../store/ProductsStore.ts";


  const { collapsed } = storeToRefs(useProductsStore());
  const productStore = useProductsStore()


</script>

<style lang="scss" scoped>
.products {
  position: absolute;
  padding: 0 20px;
  &-list {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
  }
}
.cart-wrapper {
  position: absolute;
  width: 0;
  top: 3%;
  right: -10px;
  z-index: 1;
  transition: width 300ms ease-in-out;
}
@media screen and (min-width: 541px) {
  .products {
    &-list {
      &__collapsed {
        width: 75%;
      }
    }
  }
  .cart-wrapper {
    &__extended {
      width: 25%;
      right: 0;
    }
  }
}

// Mobile view
@media screen and (max-width: 540px) and (orientation: portrait) {
  .products {
    top: 170px;
  }
  .cart-wrapper {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: baseline;
    top: 80px;
    left: 0;
    z-index: 4;
    width: 100vw;
  }
}
</style>
