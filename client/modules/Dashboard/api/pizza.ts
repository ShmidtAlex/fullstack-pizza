import BaseHttpService from '~/modules/Dashboard/api/base'
import { IAxiosConfig } from '~/models/Http/types'
import { AxiosResponse } from 'axios';
import {IPizzaModel} from "../types";

export default class PizzaService extends BaseHttpService<IAxiosConfig> {
  constructor(
    config = {
      baseURL: `http://localhost:5009/`,
      headers: {},
    }
  ) {
    super(config)
  }
  async uploadImage(payload: File): Promise<AxiosResponse> {
    const formData = new FormData();
    formData.append('image', payload);
    const { data } = await this.axiosClient.post('api/upload', formData, { headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }})
    return data
  }
  // in order not to add the own size, but only choose from existed ones
  async fetchSizes(): Promise<AxiosResponse> {
    const { data } = await this.axiosClient.get('api/size')
    return data
  }
  async createSize(payload: { value: number }): Promise<AxiosResponse> {
    const { data } = await this.axiosClient.post('api/size', payload, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    return data
  }
  async createNewPizza(payload: IPizzaModel): Promise<AxiosResponse> {
    const { name, img, pastryTypes, itemPrices, itemSizes, ingredients, description, nutrition } = payload
    const formData = new FormData()
    formData.append('name', name)
    formData.append('img', img)
    formData.append('pastryTypes', JSON.stringify(pastryTypes))
    formData.append('pastryTypes', JSON.stringify(itemPrices))
    formData.append('pastryTypes', JSON.stringify(itemSizes))
    formData.append('pastryTypes', ingredients)
    formData.append('pastryTypes', description)
    formData.append('pastryTypes', JSON.stringify(nutrition))
    const {data} = await this.axiosClient.post('api/pizza', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    return data
  }
}