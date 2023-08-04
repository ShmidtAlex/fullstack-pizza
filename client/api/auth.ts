import BaseHttpService from '@/api/base'
import { IAxiosConfig } from '~/models/Http/types'
import { AxiosResponse, AxiosError } from 'axios'

export default class AuthorizationService extends BaseHttpService<IAxiosConfig> {
  constructor(
    config = {
      baseURL: `${process.env.NUXT_ENV_BASE}/`,
      headers: {},
    }
  ) {
    super(config)
  }
  
  async registration(email: string, password: string): Promise<AxiosResponse> {
    return this.axiosClient.post(`api/user/registration`, {email, password})
  }
  
  async login(email: string, password: string): Promise<AxiosResponse> {
    console.log(email, password)
    return this.axiosClient.post(`api/user/login`, {email, password})
  }
  async check(): Promise<AxiosResponse> {
    return this.axiosClient.get(`api/auth/registration`)
  }
}
