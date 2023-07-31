// export const strict = false;
export const state = () => ({
  orderList: [],
});

export const mutations = {
  add(state, text) {
    state.orderList.push({
      text,
      // done: false
    });
  },
  addChangedIngredients(state, text) {
    state.orderList.push({
      text,
      // done: false
    });
  },
  remove(state, index) {
    state.orderList.splice(index, 1);
  },
  clearCart(state) {
    state.orderList.splice(0);
  },
  increaseNumber(state, index) {
    state.orderList[index].text.quantity++;
  },
  decreaseNumber(state, index) {
    if (state.orderList[index].text.quantity > 0) {
      state.orderList[index].text.quantity--;
    } else {
      state.orderList.splice(index, 1);
    }
  },
};
