import BaseHttpService from '~/modules/Dashboard/api/base'
import { IAxiosConfig } from '~/models/Http/types'
import { AxiosResponse } from 'axios'
import {IIngredientModel} from "~/modules/Dashboard/types";

export default class IngredientsService extends BaseHttpService<IAxiosConfig> {
  constructor(
    config = {
      baseURL: `http://localhost:5009/`,
      headers: {},
    }
  ) {
    super(config)
  }
  
  async addIngredient(payload: IIngredientModel) {
    const { name, price, img } = payload
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    if (img) {
      formData.append('img', img);
    }
    
    const { data } = await this.axiosClient.post(`api/ingredients`, payload, { headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer $${localStorage.getItem('token')}`
      }})
    return data
  }
  async removeIngredient(ingredientId: number) {
    const { data } = await this.axiosClient.delete(`api/ingredients/${ingredientId}`)
    return data
  }
  async updateIngredient(ingredientId: number, payload: IIngredientModel) {
    const { data } = await this.axiosClient.patch(`api/ingredients/${ingredientId}`, payload)
    return data
  }
  async getIngredient(ingredientId) {
    const { data } = await this.axiosClient.get(`api/ingredients/${ingredientId}`)
    return data
  }
  async getAllIngredients(req, res): Promise<AxiosResponse> {
    const { data } = await this.axiosClient.get(`api/ingredients`)
    return data
  }
}