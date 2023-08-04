import BaseHttpService from '@/api/base'
import { IAxiosConfig } from '~/models/Http/types'
import { AxiosResponse, AxiosError } from 'axios'

export default class AuthorizationService extends BaseHttpService<IAxiosConfig> {
  constructor(
    config = {
      baseURL: `http://localhost:5009/`,
      headers: {},
    }
  ) {
    super(config)
  }
  
  async registration(email: string, password: string): Promise<AxiosResponse> {
    console.log('registration', email, password)
    return this.axiosClient.post(`api/user/registration`, {email, password})
  }
  
  async login(email: string, password: string): Promise<AxiosResponse> {
    console.log('login', email, password)
    return this.axiosClient.post(`api/user/login`, {email, password})
  }
  async check(): Promise<AxiosResponse> {
    return this.axiosClient.get(`api/auth/registration`)
  }
}
