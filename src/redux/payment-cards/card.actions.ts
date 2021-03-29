import cardTypes from './card.types';
import { PaymentCard } from '../../types/paymentCardsTypes';

export const addCard = (card: PaymentCard) => {
  return {
    type: cardTypes.ADD_CARD,
    payload: card
  }
}