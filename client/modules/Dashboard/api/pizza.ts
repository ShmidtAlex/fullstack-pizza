import { AxiosResponse } from "axios";
import { IPizzaModel } from "~/components/types";
import BaseHttpService from "./base";
import { IAxiosConfig } from "~/models/Http/types";

export default class PizzaService extends BaseHttpService<IAxiosConfig> {
  constructor(
    config = {
      baseURL: `http://localhost:5009/`,
      headers: {},
    }
  ) {
    super(config);
  }

  async uploadImage(payload: File): Promise<AxiosResponse> {
    const formData = new FormData();
    formData.append("image", payload);
    const { data } = await this.axiosClient.post("api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return data;
  }

  async fetchUploadedImage(fileName: string): Promise<AxiosResponse> {
    const { data } = await this.axiosClient.get(`api/upload/uploads/${fileName}`);
    return data;
  }
  async fetchImage(fileName: string): Promise<AxiosResponse> {
    const { data } = await this.axiosClient.get(`api/upload/static/${fileName}`);
    return data;
  }

  async removeUploadedImage(fileName: string): Promise<AxiosResponse> {
    const response = await this.axiosClient.delete(`api/upload/${fileName}`);
    return response;
  }

  // in order not to add the own size, but only choose from existed ones
  async fetchSizes(): Promise<AxiosResponse> {
    const { data } = await this.axiosClient.get("api/size");
    return data;
  }

  async createSize(payload: { value: number }): Promise<AxiosResponse> {
    const { data } = await this.axiosClient.post("api/size", payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return data;
  }

  async createNewPizza(payload: IPizzaModel): Promise<AxiosResponse> {
    const {
      name,
      img,
      pastryTypes,
      itemPrices,
      itemSizes,
      ingredients,
      description,
      nutrition,
    } = payload;
    const formData = new FormData();
    // Todo:
    formData.append("name", name);
    formData.append("img", img);
    formData.append("pastryTypes", JSON.stringify(pastryTypes));
    formData.append("itemPrices", JSON.stringify(itemPrices));
    formData.append("itemSizes", JSON.stringify(itemSizes));
    formData.append("ingredients", JSON.stringify(ingredients));
    formData.append("description", description);
    formData.append("nutrition", JSON.stringify(nutrition));
    const response = await this.axiosClient.post("api/pizza", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  }
  async fetchPizzasList(): Promise<AxiosResponse> {
    const { data } = await this.axiosClient.get('api/pizza')
    return data;
  }
}
