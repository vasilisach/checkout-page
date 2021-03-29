import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import './App.css';
import Stepper from './components/Stepper';
import type RootState from './types/commonTypes';
import { Cart } from './types/cartTypes';
import store from './redux/store';
import { addToCart } from './redux/cart/cart.actions';
import axios from 'axios';

const mapStateToProps = (state: RootState) => ({
  cart: state.cart
});

const mapDispatchToProps = () => ({
  addToCart: (cart: Cart) => store.dispatch(addToCart(cart)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const App:React.FC<Props> = ({addToCart}) => {

  useEffect(() => {
    axios.get('https://fakestoreapi.com/carts/1/').then(response => {
      if (response.data) {
        addToCart(response.data)
      }
    })
  },[])

  return (
    <main className="app">
      <div className="app__container">
        <Stepper />
      </div>
    </main>
  );
}

export default connector(App);
