import React, {useState} from 'react';
import { connect, ConnectedProps } from 'react-redux';
import RootState from '../types/commonTypes';
import { PaymentCard } from '../types/paymentCardsTypes';
import store from '../redux/store';
import { addCard } from '../redux/payment-cards/card.actions';
import valid from 'card-validator';

const mapStateToProps = (state: RootState) => ({
  
});
const mapDispatchToProps = () => ({
  addCard: (card: PaymentCard) => store.dispatch(addCard(card)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;


const AddCard: React.FC<Props> = ({ addCard }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCVV] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cardhorderName, setCardholderName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  let card:PaymentCard = {
    cardNumber: '',
    cvv: '',
    expDate: '',
    name: '',
    type: ''
  }

  const addCardHandler = () => {
    const cardNumberValidation = valid.number(cardNumber);
    if (cardNumberValidation.isValid) {
      card.cardNumber = cardNumber;
      if (cardNumberValidation.card?.type) card.type = cardNumberValidation.card?.type;
    } else {
      setErrorMessage('Invalid card number');
      return;
    }
    const validExpDate = valid.expirationDate(expiryDate);
    if (validExpDate.isValid) {
      card.expDate = expiryDate;
    } else {
      setErrorMessage('Invalid card expiry date');
      return;
    }
    const validCCV = valid.cvv(cvv);
    if (validCCV.isValid) {
      card.cvv = cvv;
    } else {
      setErrorMessage('Invalid card cvv');
      return;
    }
    if (cardhorderName.length > 2) {
      card.name = cardhorderName;
    } else {
      setErrorMessage("Invalid cardholder's name");
      return;
    }

    if (card.cardNumber && card.cvv && card.expDate && card.type && card.name) {
      addCard(card);
      setCardNumber('')
      setCVV('')
      setExpiryDate('')
      setCardholderName('')
    }
  }

  return (
    <>
      <h3>Add new card</h3>
      <form name="payment-card-form">
        <fieldset>
          <input
            type="text"
            className="input-filed"
            placeholder="Card Number"
            value={cardNumber}
            onChange={e=>setCardNumber(e.target.value)}
          />
          <input
            type="text"
            className="input-filed"
            placeholder="MM/YY"
            value={expiryDate}
            onChange={e=>setExpiryDate(e.target.value)}
          />
          <input
            type="password"
            className="input-filed"
            placeholder="CCV"
            value={cvv}
            onChange={e=>setCVV(e.target.value)}
          />
          <input
            type="text"
            className="input-filed"
            placeholder="Cardholder's name"
            value={cardhorderName}
            onChange={e=>setCardholderName(e.target.value)}
          />
        </fieldset>
        <button type="button" onClick={addCardHandler}>Add</button>
        {errorMessage && <div>{ errorMessage }</div>}
      </form>
    </>
  )
}

export default connector(AddCard);