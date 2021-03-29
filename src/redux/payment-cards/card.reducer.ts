import cardTypes from './card.types';
import { PaymentCardActions } from '../../types/paymentCardsTypes';

const initialState = {
  cards: [
    {
      cardNumber: '4242424242424242',
      cvv: '122',
      expDate: '10/23',
      name: 'Victor Ivanov',
      type: 'visa'
    },
    {
      cardNumber: '5555555555554444',
      cvv: '123',
      expDate: '07/22',
      name: 'Victor Ivanov',
      type: 'mastercard'
    }
  ]
}

const cardsReducer = (state = initialState, action:PaymentCardActions) => {
  switch (action.type) {
    case cardTypes.ADD_CARD:
    return {
      ...state,
      cards: [ action.payload, ...state.cards]
    };
  
    default:
      return state;
  }
}

export default cardsReducer;