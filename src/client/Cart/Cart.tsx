import CartItem from './CartItem/CartItem';
import { Wrapper } from './Cart.styles';
import { CartItemType } from '../App';
import React from 'react';
import { Button } from '@material-ui/core';
import { calculateCartTotalAmount } from '../helpers/helpers';

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  onPurchase: () => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart, onPurchase }) => {
  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calculateCartTotalAmount(cartItems).toFixed(2)}</h2>
      {cartItems.length !== 0 &&
        <Button
          size='small'
          disableElevation
          variant='contained'
          onClick={() => onPurchase()}
        >
          Purchase
        </Button>
      }
    </Wrapper>
  );
};

export default Cart;
