import {INutrition, IPrice} from "~/modules/Dashboard/types";

export interface IOptions {
  id: number;
  value: string | number;
  label?: string;
}
export type TTogglerDataTypes = boolean | string;

export interface IIsSuccess {
  isSuccess: boolean
}

export interface IPizzaModel {
  id?: number
  name: string
  price: string
  createdAt?: string | Date
  updatedAt?: string | Date
  pastryTypes: string[]
  description: string
  nutrition: INutrition
  ingredients: number[]
  itemPrices: IPrice[]
  itemSizes: IOptions[]
  img: File | null
}