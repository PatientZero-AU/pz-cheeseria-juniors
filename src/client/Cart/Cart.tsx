import CartItem from './CartItem/CartItem';
import { Wrapper } from './Cart.styles';
import { CartItemType } from '../App';
import Button from '@material-ui/core/Button';

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  // const purchase = (items: CartItemType[]) => {
  //   //console.log(items);
  //   const fileData = JSON.stringify(items);
  //   const blob = new Blob([fileData], {type: "text/plain"});
  //   const url = URL.createObjectURL(blob);
  //   const link = document.createElement('a');
  //   link.download = 'filename.json';
  //   link.href = url;
  //   link.click();
  // };

  const purchase = (items: CartItemType[]) => (async () => {
    console.log(JSON.stringify(items));
    await fetch('api/purchases', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(items)
    });
    
  })();

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
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
      {cartItems.length === 0 ? null : <Button variant='contained' size='small'
          disableElevation data-cy={`purchase`} onClick={() => purchase(cartItems)}>Purchase</Button>} 
      
    </Wrapper>
  );
};

export default Cart;
