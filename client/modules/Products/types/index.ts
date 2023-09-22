export type TIncreasableFields =
  | "chicken"
  | "tomatoes"
  | "mozzarella"
  | "peperoni"
  | "mushrooms"
  | "onion"
  | "bacon"
  | "oregano"
  | "ham"
  | "pineapples";
export interface IPizzaSubObjectUnit {
  id: number
  name: string | number
  price?: number
  img: File | string | undefined
}
export interface IOptedAddons {
  value: string;
  count: number;
  price: number;
}
export type TAddonsForCart = {
  quantity: number;
};
export type ICancelIngredients = string[];
export interface IIncreaseable {
  id: number;
  fieldName: TIncreasableFields;
}
type IAddonNames = {
  allowedValues:
    | "ham"
    | "pineapples"
    | "mozzarella"
    | "oregano"
    | "tomatoes"
    | "peperoni"
    | "onion"
    | "pepper"
    | "chicken"
    | "bacon"
    | "mushrooms";
};
export type IAddonsDynamicObject = {
  [key in IAddonNames["allowedValues"]]: Omit<IOptedAddons, "value">;
};
export interface INutrition {
  protein: number;
  fats: number;
  carbohydrates: number;
  energy: number[];
}
export interface IPizzaData {
  id: number;
  name: string;
  ingredients: IPizzaSubObjectUnit[];
  description: string;
  nutrition: INutrition;
  types: IPizzaSubObjectUnit[];
  sizes: IPizzaSubObjectUnit[];
  itemPrices: IPizzaSubObjectUnit[];
  img: string;
}
export interface IFinalObjectForCart {
  id?: number;
  pizzaName: string;
  pizzaSize: number;
  pizzaType: string;
  extraAddons: IAddonsDynamicObject | Record<any, never>;
  excludedIngredients: string[];
  quantity: number;
  totalPrice: number;
  extraPrice: number;
  smallImg: string;
}
export interface ISliderOutput<T> {
  unitKey: number;
  unit: T;
}
export interface IPizzaSubObjectsArray {
  type: IPizzaSubObjectUnit[];
}
