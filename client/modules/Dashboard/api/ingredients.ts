import { AxiosResponse } from "axios";
import BaseHttpService from "~/modules/Dashboard/api/base";
import { IAxiosConfig } from "~/models/Http/types";
import { IIngredientModel } from "~/modules/Dashboard/types";

export default class IngredientsService extends BaseHttpService<IAxiosConfig> {
  constructor(
    config = {
      baseURL: `http://localhost:5009/`,
      headers: {},
    }
  ) {
    super(config);
  }

  async addIngredient(payload: IIngredientModel) {
    const { name, price, img } = payload;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    if (img) {
      formData.append("img", img);
    }
    // Figure out why does payload used instead of formData
    const { data } = await this.axiosClient.post(`api/ingredients`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer $${localStorage.getItem("token")}`,
      },
    });
    return data;
  }

  async removeIngredient(id: number) {
    const response = await this.axiosClient.delete(`api/ingredients/${id}`, {
      headers: {
        Authorization: `Bearer $${localStorage.getItem("token")}`,
      },
    });
    return response;
  }

  async updateIngredient(
    ingredientId: number,
    payload: Partial<IIngredientModel>
  ) {
    const { name, price, img } = payload;
    const formData = new FormData();
    if (name) {
      formData.append("name", name);
    }
    if (price) {
      formData.append("price", price);
    }
    if (img) {
      formData.append("img", img);
    }

    const response = await this.axiosClient.patch(
      `api/ingredients/${ingredientId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer $${localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  }

  async getIngredient(ingredientId) {
    const { data } = await this.axiosClient.get(
      `api/ingredients/${ingredientId}`
    );
    return data;
  }

  async getAllIngredients(): Promise<AxiosResponse> {
    const { data } = await this.axiosClient.get(`api/ingredients`);
    return data;
  }
}
