import { AxiosResponse } from "axios";
// import { IPizzaModel } from "~/components/types";
import BaseHttpService from "~/modules/Dashboard/api/base";
import { IAxiosConfig } from "~/models/Http/types";

export default class ProductsService extends BaseHttpService<IAxiosConfig> {
  constructor(
    config = {
      baseURL: `http://localhost:5009/`,
      headers: {},
    }
  ) {
    super(config);
  }
  
  async fetchPizzasList(): Promise<AxiosResponse> {
    const { data } = await this.axiosClient.get('api/pizza')
    return data;
  }
}
