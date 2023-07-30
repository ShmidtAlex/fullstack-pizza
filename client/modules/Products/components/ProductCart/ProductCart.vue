<template>
  <div class="cart">
    <div class="cart__stripe"></div>
    <div class="cart__circle">
      <div class="cart-img"></div>
    </div>
    <div class="cart__body">
      <div class="cart__body_header">
        <div class="cart__body_header-info">
          <h3>Cart</h3>
          <div class="positions-number">({{ order.length }})</div>
          <button class="expand-list expand-list--down" :class="{'expand-list--up': isDetailsShown}" @click="showDetails"></button>
        </div>
        <button class="cart__body_header-clear" @click="clearCart">
          Clear
        </button>
      </div>
      <div
        class="cart__body_details"
        :class="{ 'cart__body_details--active': isDetailsShown }"
      >
        <div v-for="(unit, id) in order" class="cart__body_details_unit">
          <CartUnit :key="id" :unit="unit" />
        </div>
      </div>

      <div class="cart__body_total">
        <div class="total-text">Total:</div>
        <div class="total-amount">{{ totalCost }} &euro;</div>
      </div>
    </div>
    <div v-if="order.length" class="cart__order">
      <button class="cart__order-button">Order Now</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProductsStore } from "~/modules/Products/store/ProductsStore";
const { order, totalCost } = storeToRefs(useProductsStore());
const { clearCart } = useProductsStore();
const isDetailsShown = ref<boolean>(true);

const showDetails = (): void => {
  isDetailsShown.value = !isDetailsShown.value;
};
const cartHeight = computed(() => {
  return `${order.value.length * 120}px`;
});
</script>
<style lang="scss" scoped>
.cart {
  width: 300px;
  min-height: fit-content;
  position: sticky;
  top: 20%;
  right: 0;
  z-index: 1;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
  border-radius: 0 0 8px 8px;
  &__stripe {
    width: 100%;
    height: 3px;
    background-color: #c21313;
    border-radius: 2px;
  }
  &__circle {
    position: absolute;
    box-sizing: border-box;
    top: -48px;
    left: 100px;
    width: 96px;
    height: 96px;
    border-radius: 50%;
    background-color: #fff;
    border: 3px solid #c21313;
    color: #c21313;
    display: flex;
    justify-content: center;
    .cart-img {
      background-image: url("/static/icons/cart.svg");
      background-size: cover;
      position: absolute;
      width: 36px;
      height: 36px;
      background-repeat: no-repeat;
      margin-top: 15px;
    }
  }
  &__body {
    min-width: 100%;
    width: 100%;
    height: 100%;
    position: relative;
    background-color: rgba(255, 255, 255, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    border-radius: 0 0 8px 8px;
    &_header {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: 80px;
      padding: 15px;
      border-bottom: 1px solid #70544f;
      h3 {
        padding: 0;
        margin: 0 0 0 0;
        position: relative;
        font-weight: 700;
        color: #70544f;
        line-height: 1.33;
        display: flex;
        align-items: center;
        height: 100%;
      }
      &-info {
        display: flex;
        position: relative;
        justify-content: space-between;
        width: 25%;
        height: 100%;
        align-items: center;
      }
      &-clear {
        color: #70544f;
        margin: 0 0 10px 0;
        border: none;
        outline: none;
      }
    }
    &_details {
      width: 100%;
      height: 0;
      transition: height 300ms ease-in-out;
      transition-delay: 300ms;
      max-height: 50vh;
      overflow: scroll;
      &_unit {
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: space-around;
        padding: 15px;
      }
      &--active {
        height: v-bind(cartHeight);
        max-height: 50vh;
      }
    }
    &_total {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      border-top: 1px solid lightgreen;
      padding: 10px 15px 0 15px;
    }
  }
  &__order {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 100%;
    height: 50%;
    background-color: white;
    border-radius: 0 0 8px 8px;
    &-button {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 48px;
      padding: 15px 25px;
      border-radius: 8px;
      background-color: #009471;
      border: none;
      color: #fff;
      font-weight: 700;
      margin: 20px;
      font-size: 16px;
      outline: none;
      text-transform: uppercase;
      cursor: pointer;
    }
  }
}

.positions-number {
  color: #70544f;
  margin: 0 0 10px 0;
  border: none;
  outline: none;
}
.expand-list {
  border-radius: 10px;
  margin: 0 0 10px 0;
  position: relative;
  color: #fff;
  border-style: solid;
  cursor: pointer;
  &--down{
    &:after {
      content: "";
      position: absolute;
      border: 7px solid transparent;
      border-top: 7px solid #70544f;
      top: -2px;
      left: 1px;
      transition: all 500ms ease-in-out;
    }
  }
  &--up {
    &:after {
      content: "";
      position: absolute;
      border: 7px solid transparent;
      border-top: 7px solid #70544f;
      top: -10px;
      left: 1px;
      transform: rotateX(180deg);
    }
  }
}

@media screen and (max-width: 540px) and (orientation: portrait) {
  .cart {
    width: 100%;
    &__body {
      align-items: flex-start;
      &_header {
        &-clear {
          margin: 0;
        }
      }
      &_details {
        &_unit {
          border-bottom: 1px solid lightgray;
        }
      }
      &_total {
        border: none;
        padding: 0px 15px 0 15px;
      }
      &_header {
        height: 40px;
        &-info {
          width: 15%;
        }
      }
    }
    &__circle {
      left: 40%;
    }
    &__order {
      &-button {
        margin: 0 0 10px 0;
        height: 30px;
        padding: 15px 15px;
        font-size: 14px;
      }
    }
  }
}
</style>
