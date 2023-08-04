import { AxiosInstance } from 'axios'
import axios from 'axios'
import { IAxiosConfig } from '~/models/Http/types'

axios.defaults.withCredentials = true;

export default class BaseHttpService<HttpService> {
  
  axiosConfig = {
    withCredentials: true,
    baseURL: `http://localhost:5009/api/`,
    headers: {
      'Cache-Control': 'no-cache',
    },
  }
  axiosClient: AxiosInstance = axios.create()
  
  constructor(config: IAxiosConfig = {}) {
    
    console.log('axiosClient',this.axiosConfig, process.env)
    this.axiosClient = axios.create(Object.assign(this.axiosConfig, config))
    this.axiosClient.defaults.withCredentials = true
  }
  
  wrap(callback: Function): any {
    callback.bind(this).call(this, this)
    return this
  }
}