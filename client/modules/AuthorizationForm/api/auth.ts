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
  // Todo: create and insert types for axios responses in each method, meaning
  //  Promise<AxiosResponse<CustomInterface>> and this.axiosClient.post<CustomInterface>() which allows to get transparent response with IDE hints
  async registration(email: string, password: string): Promise<AxiosResponse> {
    const { data } = await this.axiosClient.post(`api/user/registration`, {email, password})
    localStorage.setItem('token', data.accessToken)
    return jwt_decode(data.accessToken)
  }
  
  async login(email: string, password: string): Promise<AxiosResponse> {
    const { data } = await this.axiosClient.post(`api/user/login`, {email, password})
    localStorage.setItem('token', data.accessToken)
    return jwt_decode(data.accessToken)
  }
  async logout(): Promise<void> {
    const { data } = await this.axiosClient.post(`api/user/logout`)
    localStorage.removeItem('token')
    // return jwt_decode(data.accessToken)
  }
  async check(): Promise<AxiosResponse> {
    const { data } = this.axiosClient.get(`api/user/auth`)
    localStorage.setItem('token', data.accessToken)
    return jwt_decode(data.accessToken)
  }
}
