import BaseHttpService from '~/modules/Dashboard/api/base'
import { IAxiosConfig } from '~/models/Http/types'
import { AxiosResponse } from 'axios';

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
}