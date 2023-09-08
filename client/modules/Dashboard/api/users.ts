// Todo: move BaseHttpService to general api folder in the root of the project
import { AxiosResponse } from "axios";
import BaseHttpService from "~/modules/Dashboard/api/base";
import { IAxiosConfig } from "~/models/Http/types";

export default class UsersService extends BaseHttpService<IAxiosConfig> {
  constructor(
    config = {
      baseURL: `http://localhost:5009/`,
      headers: {},
    }
  ) {
    super(config);
  }

  // Todo: add api call to dashboard in order to get all users data and add types for AxiosResponse
  async getAllUsers(): Promise<AxiosResponse> {
    const { data } = await this.axiosClient.get(`api/user/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return data;
  }

  async deleteUser(userId:number): Promise<AxiosResponse> {
    const { data } = await this.axiosClient.delete(`api/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return data;
  }

  async updateUser(userId): Promise<AxiosResponse> {
    const { data } = await this.axiosClient.patch(`api/user/users`, userId, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return data;
  }
}
