import * as React from 'react';
import CartItem from './CartItem/CartItem';
import { Wrapper } from './Cart.styles';
import { CartItemType } from '../App';
import { Typography } from '@material-ui/core';
import { StyledButton } from '../App.styles';

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  clickToPurchase: () => void;
  clearCart: () => void;
};

const Cart: React.FC<Props> = ({
  cartItems,
  addToCart,
  removeFromCart,
  clickToPurchase,
  clearCart,
}) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
      {cartItems.length && (
        <div className="cart-buttons">
          <StyledButton
            className="purchase-button"
            data-cy="purchase-button"
            onClick={clickToPurchase}
          >
            <Typography variant="h4">Purchase</Typography>
          </StyledButton>
          <StyledButton className="clear-button" onClick={clearCart}>
            <Typography variant="h4">Clear Cart</Typography>
          </StyledButton>
        </div>
      )}
    </Wrapper>
  );
};

export default Cart;
