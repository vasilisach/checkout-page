import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import RootState from '../types/commonTypes';
import CartItem from './CartItem';

const mapStateToProps = (state: RootState) => ({
  cart: state.cart
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const OrderConfirmStep: React.FC<Props> = ({ cart }) => {
  return (
    <>
      <h2>Order confirmation</h2>
      <div>
        {cart.data && cart.data?.products?.length ? cart.data.products.map(product => (
          <CartItem {...product} key={ product.productId}/>
        )) : ''}
      </div>
      <div className="total">
        <b>Total: { cart.total }</b>
      </div>
    </>
  )
}

export default connector(OrderConfirmStep);