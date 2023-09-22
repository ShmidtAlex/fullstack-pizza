export interface IAccountData {
  id?: number
  userId: number | null
  firstName: string
  lastName?: string
  contactPhone: string
  img?: File | null | string;
}

export interface IDeliveryAddress {
  id?: number
  userId: number
  city: string
  street: string
  building?: number
  apartments?: number
}

export interface IPaymentMethod {
  id?: number
  userId: number
  name: string
  type: string
  cardNumber?: number
  expirationMonth?: number
  expirationYear?: number
  paypalEmail?: string
}