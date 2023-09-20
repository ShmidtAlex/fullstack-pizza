// Todo: move BaseHttpService to general api folder in the root of the project
import { AxiosResponse } from "axios";
import BaseHttpService from "~/modules/AuthorizationForm/api/base";
import { IAxiosConfig } from "~/models/Http/types";

export default class PersonalAccountService extends BaseHttpService<IAxiosConfig> {
  constructor(
    config:IAxiosConfig = {
      baseURL: `http://localhost:5009/`,
      headers: {},
    }
  ) {
    super(config);
  }

  async createPaymentMethod(payload): Promise<AxiosResponse> {
    const { userId, paymentData } = payload;
    const { data } = await this.axiosClient.post(
      `api/account/payment-method/${userId}`,
      paymentData
    );
    return data;
  }
  async deletePaymentMethod(payload): Promise<AxiosResponse> {
    const { userId, methodId } = payload;
    const { data } = await this.axiosClient.delete(
      `api/account/delete/payment-method/${userId}/method/${methodId}`
    );
    return data;
  }
  async createDeliveryAddress(payload): Promise<AxiosResponse> {
    const { userId, addressData } = payload;
    const { data } = await this.axiosClient.post(`api/account/address/${userId}`, addressData)
    return data
  }
  async deleteDeliveryAddress(payload): Promise<AxiosResponse> {
    const { userId, addressId } = payload;
    const { data } = await this.axiosClient.post(
      `api/account/delete/${userId}/address/${addressId}`
    )
    return data
  }
}
