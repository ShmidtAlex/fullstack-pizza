import { defineStore } from "pinia";
// import { IFinalObjectForCart, IIncreaseable } from "~/modules/Products/types";

export const useUserStore = defineStore("user", {
  state: () => ({
    _isAuth: false,
    _user: {},
  }),
  getters: {
    isAuth: (state) => {
      return state._isAuth
    },
    user: (state) => {
      return state._user
    }
  },
  actions: {
    setIsAuth(val): void {
      this._isAuth = val;
    },
    setUser(user): void {
      this._user = user
    },
  },
});
