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
    return jwt_decode(data.token)
  }
  
  async login(email: string, password: string): Promise<AxiosResponse> {
    const { data } = await this.axiosClient.post(`api/user/login`, {email, password})
    return jwt_decode(data.token)
  }
  async check(user): Promise<AxiosResponse> {
    console.log('user',user)
    const { data } = this.axiosClient.get(`api/user/auth`, user)
    return jwt_decode(data.token)
  }
}
