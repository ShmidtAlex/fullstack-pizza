export interface IIngredientModel {
  id?: number
  name: string
  price: string
  img: File | null | string
  createdAt?: string | Date
  updatedAt?: string | Date
}

export interface IIngredientUpdates {
  ingredientId: number
  redactedIngredient: Partial<IIngredientModel>
}

export interface INutrition {
  id?: number
  protein: number
  fats: number
  carbohydrates: number
  energy: number
  pizzaId?: number
}
export interface IPizzaModel extends Partial<IIngredientModel>{
  pastryTypes: string[]
  description: string
  nutrition: INutrition
  itemPrices: number[]
  itemSizes: number[]
}