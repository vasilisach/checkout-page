import React from 'react';
import VisaIcon from './icons/VisaIcon';
import MasterCardIcon from './icons/MasterCardIcon';
import { PaymentCard } from '../types/paymentCardsTypes';

const PaymentCardItem: React.FC<PaymentCard> = (card) => {
  return (
    <div className="payment-card" key={card.cvv}>
      <div className="payment-card__logo">
        {card.type && card.type === 'visa' && <VisaIcon />}
        {card.type && card.type === 'mastercard' && <MasterCardIcon />}
      </div>
      <div className="payment-card__number">
        {card.cardNumber}
      </div>
      <div className="payment-card__info">
        <div className='credit-card__info_name'>
          <div className='credit-card__info_label'>CARDHOLDER'S NAME</div>
          <div>{card.cardholdersName}</div>
        </div>

        <div className='credit-card__info_expiry'>
          <div className='credit-card__info_label'>VALID UP TO</div>
          <div>{card.expDate }</div>
        </div>
      </div>
    </div>
  )
}

export default PaymentCardItem;