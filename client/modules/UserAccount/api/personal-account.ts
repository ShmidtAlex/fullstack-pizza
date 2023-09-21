// Todo: move BaseHttpService to general api folder in the root of the project
import { AxiosResponse } from "axios";
import BaseHttpService from "./base";
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
  async createUserAccount(payload): Promise<AxiosResponse>{
    const {
      firstName, lastName, contactPhone, img, userId
    } = payload;
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("img", img);
    formData.append("contactPhone", contactPhone);
    formData.append("lastName", lastName);
    formData.append("firstName", firstName);
    const { data } = await this.axiosClient.post('api/account/create', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
    return data;
  }
  async updateUserAccount(payload): Promise<AxiosResponse> {
    const {
      firstName, lastName, contactPhone, img, userId
    } = payload;
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("img", img);
    formData.append("contactPhone", contactPhone);
    formData.append("lastName", lastName);
    formData.append("firstName", firstName);
    const { data } = await this.axiosClient.post('api/account/update', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
    return data;
  }
  async createPaymentMethod(payload): Promise<AxiosResponse> {
    const { userId, paymentData } = payload;
    const { data } = await this.axiosClient.post(
      `api/account/payment-method/${userId}`,
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }
    );
    return data;
  }
  async deletePaymentMethod(payload): Promise<AxiosResponse> {
    const { userId, methodId } = payload;
    const { data } = await this.axiosClient.delete(
      `api/account/delete/payment-method/${userId}/method/${methodId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }
    );
    return data;
  }
  async createDeliveryAddress(payload): Promise<AxiosResponse> {
    const { userId, addressData } = payload;
    const { data } = await this.axiosClient.post(`api/account/address/${userId}`, addressData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
    return data
  }
  async deleteDeliveryAddress(payload): Promise<AxiosResponse> {
    const { userId, addressId } = payload;
    const { data } = await this.axiosClient.post(
      `api/account/delete/address/${userId}/address/${addressId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }
    )
    return data
  }
  async getAccountData(userId): Promise<AxiosResponse> {
    const { data } = await this.axiosClient.get(`api/account/${userId}`)
    return data
  }
  async deleteAvatar(payload): Promise<AxiosResponse> {
    const { userId } = payload;
    const { data } = await this.axiosClient.post(
      `api/account/delete/avatar/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }
    )
    return data
  }
}
