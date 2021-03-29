import React from 'react';
import Slider from 'react-slick';
import { connect, ConnectedProps } from 'react-redux';
import RootState from '../types/commonTypes';
import { PaymentCard } from '../types/paymentCardsTypes';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import VisaIcon from './icons/VisaIcon';
import MasterCardIcon from './icons/MasterCardIcon';
import AddCard from './AddCard';

const mapStateToProps = (state: RootState) => ({
  paymentCards: state.cards
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const PaymentMethodStep: React.FC<Props> = ({ paymentCards }) => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
  <>
      <h2>Choose payment card</h2>
      <Slider {...settings} className="cards-slider">
        {paymentCards.cards.length && paymentCards.cards.map((card: PaymentCard) => (
          <div className="payment-card" key={card.cvv}>
            <div className="payment-card__logo">
              {card.type === 'visa' && <VisaIcon />}
              {card.type === 'mastercard' && <MasterCardIcon />}
            </div>
            <div className="payment-card__number">
              {card.cardNumber}
            </div>
            <div className="payment-card__info">
              <div className='credit-card__info_name'>
                <div className='credit-card__info_label'>CARDHOLDER'S NAME</div>
                <div>{card.name}</div>
              </div>

              <div className='credit-card__info_expiry'>
                <div className='credit-card__info_label'>VALID UP TO</div>
                <div>{card.expDate }</div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <AddCard />
  </>
  )
}

export default connector(PaymentMethodStep);