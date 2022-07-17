import CartItem from './CartItem/CartItem';
import { Wrapper } from './Cart.styles';
import { CartItemType } from '../App';
import { Button, Typography } from '@material-ui/core';
import { StyledButton } from '../App.styles';

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  clickToPurchase: () => void;
};

const Cart: React.FC<Props> = ({
  cartItems,
  addToCart,
  removeFromCart,
  clickToPurchase,
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
        <StyledButton className="purchase-button" onClick={clickToPurchase}>
          <Typography variant="h4">Purchase</Typography>
        </StyledButton>
      )}
    </Wrapper>
  );
};

export default Cart;
