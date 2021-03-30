import { CartState } from './cartTypes';
import { PaymentCard } from './paymentCardsTypes';

export default interface RootState {
  cart: CartState,
  cards: { cards: PaymentCard[] | [], selectedCard: number }
}