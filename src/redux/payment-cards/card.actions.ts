import cardTypes from './card.types';
import { PaymentCard } from '../../types/paymentCardsTypes';

export const addCard = (card: PaymentCard) => {
  return {
    type: cardTypes.ADD_CARD,
    payload: card
  }
}

export const changeSelectedCard = (index: number) => {
  return {
    type: cardTypes.CHANGE_SELECTED_CARD,
    payload: index
  }
}