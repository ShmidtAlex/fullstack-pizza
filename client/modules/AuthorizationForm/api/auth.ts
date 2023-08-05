import BaseHttpService from '~/modules/AuthorizationForm/api/base'
import { IAxiosConfig } from '~/models/Http/types'
import { AxiosResponse } from 'axios'
import jwt_decode from "jwt-decode"

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
    const { data } = await this.axiosClient.post(`api/user/registration`, {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
  }
  
  async login(email: string, password: string): Promise<AxiosResponse> {
    const { data } = await this.axiosClient.post(`api/user/login`, {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
  }
  async check(): Promise<AxiosResponse> {
    const { data } = this.axiosClient.get(`api/user/auth`)
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
  }
}
