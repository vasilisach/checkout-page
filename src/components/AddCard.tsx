import React, {useState} from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { PaymentCard } from '../types/paymentCardsTypes';
import store from '../redux/store';
import { addCard, changeSelectedCard } from '../redux/payment-cards/card.actions';
import valid from 'card-validator';
import RootState from '../types/commonTypes';

const mapStateToProps = (state: RootState) => ({
  selectedCard: state.cards.selectedCard
});

const mapDispatchToProps = () => ({
  addCard: (card: PaymentCard) => store.dispatch(addCard(card)),
  changeSelectedCard: (index: number) => store.dispatch(changeSelectedCard(index))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;


const AddCard: React.FC<Props> = ({ addCard, changeSelectedCard, selectedCard }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCVV] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cardholdersName, setCardholdersName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const clearForm = () => {
    setCardNumber('');
    setCVV('');
    setExpDate('');
    setCardholdersName('');
    setErrorMessage('');
  }

  const validateCard = (card: PaymentCard) => {
    let result = { isValid: false, error: '' };
    const cardNumberValidation = valid.number(card.cardNumber);
    if (!cardNumberValidation.isValid) {
      result.error = "Invalid card's number";
      return result;
    }
    if (cardNumberValidation.card?.type) card.type = cardNumberValidation.card?.type;
    const validExpDate = valid.expirationDate(card.expDate);
    if (!validExpDate.isValid) {
      result.error = "Invalid card's expiry date";
      return result;
    }
    const validCVV = valid.cvv(card.cvv);
    if (!validCVV.isValid) {
      result.error = "Invalid card's CVV";
      return result;
    }
    if (!card.cardholdersName || card.cardholdersName.length < 1) {
      result.error = "Invalid cardholder's name";
      return result;
    }
    result.isValid = true;
    return result;
  }

  const addCardHandler = () => {
    let card = {
      cardNumber,
      cvv,
      expDate,
      cardholdersName,
      type:''
    }
    const validationResult = validateCard(card);
    if (validationResult.isValid && !validationResult.error) {
      addCard(card);
      clearForm();
      if(selectedCard!==0) changeSelectedCard(0);
    } else {
      setErrorMessage(validationResult.error);
    }
  }

  return (
    <>
      <h3>Add new card</h3>
      <form name="payment-card-form" className="payment-card-form">
        <fieldset>
          <input
            type="text"
            className="payment-card-form__input-filed"
            placeholder="Card Number"
            value={cardNumber}
            onChange={e => setCardNumber(e.target.value)}
          />
          <input
            type="text"
            className="payment-card-form__input-filed"
            placeholder="MM/YY"
            value={expDate}
            onChange={e=>setExpDate(e.target.value)}
          />
          <input
            type="password"
            className="payment-card-form__input-filed"
            placeholder="CCV"
            autoComplete="new-password"
            value={cvv}
            onChange={e=>setCVV(e.target.value)}
          />
          <input
            type="text"
            className="payment-card-form__input-filed"
            placeholder="Cardholder's name"
            value={cardholdersName}
            onChange={e=>setCardholdersName(e.target.value)}
          />
        </fieldset>
        <button type="button" className="payment-card-form__add-card" onClick={addCardHandler}>Add card</button>
        {errorMessage && <div className="error-message">{ errorMessage }</div>}
      </form>
    </>
  )
}

export default connector(AddCard);