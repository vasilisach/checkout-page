export type CartProductData = {
  productId: number,
  quantity: number
}
export interface Cart {
  id: number,
  userId?: number,
  date?: Date,
  products?: CartProductData[],
  __v?: number
}

type ActionType = {
  type: string
}

export interface AddToCart extends ActionType {
  data: Cart
}
export interface AddTotal extends ActionType {
  total: number
}

export interface CartActions extends ActionType {
  data?: Cart,
  total?: number
}

export interface CartState {
  data: Cart,
  total: number
}