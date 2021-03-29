import { combineReducers } from 'redux';
import './payment-cards/card.reducer';
import cartReducer from './cart/cart.reducer';
import cardsReducer from './payment-cards/card.reducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  cards: cardsReducer
});

export default rootReducer;