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
  async uploadImage(payload) {
    const formData = new FormData();
    formData.append('image', payload);
    const { data } = await this.axiosClient.post('api/upload', formData, { headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }})
    return data
  }
  async getPreUploaded(imageName) {
    const response = await this.axiosClient.get(`api/upload/${imageName}`)
    return response
  }
}