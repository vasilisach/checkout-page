import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MultiplyIcon from './icons/MultiplyIcon';
import { connect, ConnectedProps } from 'react-redux';
import { addToTotalPrice } from '../redux/cart/cart.actions';
import store from '../redux/store';

const mapDispatchToProps = () => ({
  addToTotalPrice: (sum: number) => store.dispatch(addToTotalPrice(sum)),
});
const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  productId: number,
  quantity: number
}

const CartItem: React.FC<Props> = ({ addToTotalPrice, ...props }) => {
  
  const [product, setProduct] = useState({
    image: '',
    price: 0
  });

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${props.productId}`).then(response => {
      if (response.data) {
        setProduct(response.data);
        let sum = response.data.price * props.quantity;
        addToTotalPrice(sum);
      } 
    })
  }, [])

  return (
    <div className="cart-item">
      <div className="cart-item__left">
        <img src={product.image} className="cart-item__image" />
        <MultiplyIcon />
        <b>{props.quantity}</b>
      </div>
      <div>{product.price * props.quantity }</div>
    </div>
  )
}

export default connector(CartItem);