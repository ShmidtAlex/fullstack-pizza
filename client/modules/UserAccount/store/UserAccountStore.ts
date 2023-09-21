import { defineStore } from "pinia";
import { $api } from "~/plugins/api";
import { IAccountData, IDeliveryAddress, IPaymentMethod } from "../types/index";

export const useUserAccountStore = defineStore("UserAccountStore", {
  state: () => ({
    _accountData: <IAccountData>null,
    _paymentMethods: <IPaymentMethod>null,
    _deliveryAddresses: <IDeliveryAddress>[],
    loaders: {
      _fetchAccountDataLoader: false
    },
  }),
  getters: {
  
  },
  actions: {
    toggleLoader(loaderName: string, state): void {
      this.loaders[loaderName] = state;
    },
    setAccountData(data) {
      this._accountData = data
    },
    async fetchAccountData(userId): Promise<void> {
      this.toggleLoader("_fetchAccountDataLoader", true);
      const response = await $api.account.getAccountData(userId)
      this.setAccountData(response)
      this.toggleLoader("_fetchAccountDataLoader", false);
    }
  },
});
