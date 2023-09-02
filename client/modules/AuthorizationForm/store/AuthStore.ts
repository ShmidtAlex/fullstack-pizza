import { defineStore } from "pinia";
import axios from "axios";
import { DASHBOARD_ACCESS_ROLES, DASHBOARD_ADMIN_ROLES} from "~/constants";
import { AuthState, User } from "~/modules/AuthorizationForm/types";

// Todo: add ts

export const useAuthStore = defineStore("auth", {
  state: ():AuthState => ({
    _isAuth: false,
    _user: { role: ''},
  }),
  getters: {
    isAuth: (state: AuthState) => {
      return state._isAuth
    },
    user: (state: AuthState) => {
      return state._user
    },
    isAdmin: (state: AuthState) => {
      if (state._user) {
        return state._isAuth && DASHBOARD_ADMIN_ROLES.includes(state._user.role)
      }
      return false
    },
    isAdminOrRedactor: (state: AuthState) => {
      if (state._user) {
        return state._isAuth && DASHBOARD_ACCESS_ROLES.includes(state._user.role)
      }
      return false
    }
  },
  actions: {
    setIsAuth(val: boolean): void {
      this._isAuth = val;
    },
    setUser(user: User): void {
      this._user = user
    },
    async checkAuth() {
      try {
        // Todo: yes, but we should check if user not log outed, because otherwise page reloading logs him in again
        const response = await axios.get(`http://localhost:5009/api/user/refresh`, { withCredentials: true });
        localStorage.setItem('token', response.data.accessToken);
        if (response.data.accessToken) {
          this.setIsAuth(true);
          this.setUser(response.data.user)
        }
      } catch (e) {
        console.log(e.response?.data?.message)
      }
    }
  },
});
