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