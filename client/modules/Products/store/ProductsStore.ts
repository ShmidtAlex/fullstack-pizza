import { defineStore } from "pinia";
import { IFinalObjectForCart, IIncreaseable } from "~/modules/Products/types";
import {$api} from "~/plugins/api";
import {IPizzaModel} from "~/components/types";
const maxAddons = 2;
export const useProductsStore = defineStore("ProductsStore", {
  state: () => ({
    order: [] as IFinalObjectForCart[],
    collapsed: false,
    pizzasList: [] as IPizzaModel[]
  }),
  getters: {
    totalCost: (state) => {
      return state.order.length
        ? state.order
            .map((item) => item.totalPrice * item.quantity)
            .reduce((acc, el) => {
              return (acc += el);
            })
            .toFixed(2)
        : 0;
    },
  },
  actions: {
    addToOrder(newItem: IFinalObjectForCart): void {
      this.order.push(newItem);
    },
    clearCart(): void {
      this.order = [];
      setTimeout(() => {
        this.collapsed = false;
      }, 1000);
    },
    collapse(): void {
      this.collapsed = true;
    },
    removeItem(id: number): void {
      this.order = this.order.filter((elem) => elem.id !== id);
      if (!this.order.length) {
        this.clearCart();
      }
    },
    increaseNumber({ id, fieldName }: IIncreaseable): void {
      const goal = this.order.find((elem) => elem.id === id);
      if (
        goal?.extraAddons &&
        fieldName &&
        goal.extraAddons[fieldName].count < maxAddons
      ) {
        goal.extraAddons[fieldName].count++;
        goal.totalPrice += goal.extraAddons[fieldName].price;
      }
      if (goal?.extraAddons && goal.quantity < 10 && !fieldName) {
        goal.quantity++;
      }
    },
    decreaseNumber({ id, fieldName }: IIncreaseable): void {
      const goal = this.order.find((elem) => elem.id === id);
      if (
        goal?.extraAddons &&
        fieldName &&
        goal.extraAddons[fieldName].count > 0
      ) {
        goal.extraAddons[fieldName].count--;
        goal.totalPrice -= goal.extraAddons[fieldName].price;
      }
      if (goal?.extraAddons && goal.quantity > 1 && !fieldName) {
        goal.quantity--;
      }
    },
    setPizzasList(list) {
      console.log(list)
      this.pizzasList = list
    },
    async fetchPizzas() {
      const result = await $api.pizza.fetchPizzasList()
      this.setPizzasList(result)
    }
  },
});
