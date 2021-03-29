import cartTypes from './cart.types';
import { Cart, AddToCart, AddTotal } from '../../types/cartTypes';

export const addToCart = (cart: Cart): AddToCart=>{
  return {
    type: cartTypes.ADD_TO_CART,
    data: cart
  }
}

export const addToTotalPrice = (sum: number):AddTotal => {
  return {
    type: cartTypes.ADD_TO_TOTAL,
    total: sum
  }
}