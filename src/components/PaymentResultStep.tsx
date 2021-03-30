import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import RootState from '../types/commonTypes';
import PaymentCardItem from './PaymentCardItem';
import CheckMarkIcon from './icons/CheckMarkIcon';

const mapStateToProps = (state: RootState) => ({
  selectedCard: state.cards.selectedCard,
  totalSum: state.cart.total,
  cards: state.cards.cards
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const PaymentResultStep:React.FC<Props> = ({selectedCard, totalSum, cards}) => {
  return (
    <>
      <h2>Payment result</h2>
      <div className="payment-result-info">
        <h3>The payment was done successfully. Thank you for your order!</h3>
        <div className="check-mark">
          <CheckMarkIcon />
        </div>
        <p>Total sum: <b>{totalSum}</b></p>
        <p>Order was paid by card:</p>
        <PaymentCardItem  {...cards[selectedCard]}/>
      </div>
      
    </>
  )
}

export default connector(PaymentResultStep);