// Todo: move BaseHttpService to general api folder in the root of the project
import BaseHttpService from '~/modules/AuthorizationForm/api/base'
import { IAxiosConfig } from '~/models/Http/types'
import { AxiosResponse } from 'axios'

export default class PersonalAccountService extends BaseHttpService<IAxiosConfig> {
  constructor(
    config = {
      baseURL: `http://localhost:5009/`,
      headers: {},
    }
  ) {
    super(config)
  }
  async updateUser(user): Promise<AxiosResponse> {
    
    const { data } = await this.axiosClient.patch(`api/user/update-account/${user.id}`, user)
    return data
  }
}
