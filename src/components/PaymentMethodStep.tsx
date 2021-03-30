import React from 'react';
import Slider from 'react-slick';
import { connect, ConnectedProps } from 'react-redux';
import RootState from '../types/commonTypes';
import { PaymentCard } from '../types/paymentCardsTypes';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AddCard from './AddCard';
import PaymentCardItem from './PaymentCardItem';
import store from '../redux/store';
import { changeSelectedCard } from '../redux/payment-cards/card.actions';

const mapStateToProps = (state: RootState) => ({
  paymentCards: state.cards.cards,
  selectedCard: state.cards.selectedCard
});

const mapDispatchToProps = () => ({
  changeSelectedCard: (index: number) => store.dispatch(changeSelectedCard(index))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const PaymentMethodStep: React.FC<Props> = ({ paymentCards, changeSelectedCard, selectedCard }) => {

  const settings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    slickGoTo: selectedCard,
    afterChange: (current: number) => {
      changeSelectedCard(current);
    }
  };

  return (
  <>
      <h2>Choose payment card</h2>
      <Slider {...settings} className="cards-slider" key={paymentCards.length}>
        {paymentCards.length && paymentCards.map((card: PaymentCard) => (
          <PaymentCardItem {...card} key={card.cardNumber} />
        ))}
      </Slider>
      <AddCard />
  </>
  )
}

export default connector(PaymentMethodStep);