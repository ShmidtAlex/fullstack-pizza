import { defineStore } from "pinia";
import axios from "axios";
// import { IFinalObjectForCart, IIncreaseable } from "~/modules/Products/types";

export const useAuthStore = defineStore("auth", {
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
    async checkAuth() {
      try {
        const response = await axios.get(`http://localhost:5009/api/user/refresh`, { withCredentials: true });
        localStorage.setItem('token', response.data.accessToken);
        this.setIsAuth(true);
        this.setUser(response.data.user)
      } catch (e) {
        console.log(e.response?.data?.message)
      }
    }
  },
});
