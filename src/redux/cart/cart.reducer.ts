import cartTypes from './cart.types';
import { CartActions } from '../../types/cartTypes';

const initialState  = {
  data: {},
  total: 0
}

const cartReducer = (state = initialState, action: CartActions) => {
  switch (action.type) {
    case cartTypes.ADD_TO_CART:
      return { ...state, data: action.data }
    
    case cartTypes.ADD_TO_TOTAL:
      return { ...state, total: state.total + Number(action.total) }
  
    default:
      return state;
  }
}

export default cartReducer;