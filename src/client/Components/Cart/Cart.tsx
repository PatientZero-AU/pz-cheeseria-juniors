import CartItem from './CartItem/CartItem';
import { Wrapper } from './Cart.styles';
import { CartItemType } from '../../types';
import { Dispatch, SetStateAction, SyntheticEvent } from 'react';
import { Button } from '@material-ui/core';
import { requestCreateOrder } from '../../services/order';
import { useDispatch } from 'react-redux';

type Props = {
	cartItems: CartItemType[];
	addToCart: (e: SyntheticEvent, clickedItem: CartItemType) => void;
	removeFromCart: (id: number) => void;
	setCartItems: Dispatch<SetStateAction<CartItemType[]>>;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart, setCartItems }) => {
	const calculateTotal = (items: CartItemType[]) =>
		items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

	const totalPrice = calculateTotal(cartItems);
	const dispatch = useDispatch();

	const handlePurchase = async () => {
		 await dispatch({ type: 'POST_ORDER', payload: { totalPrice, items: [...cartItems] } });
		setCartItems([]);
	};

	return (
		<Wrapper>
			<h2>Your Shopping Cart</h2>
			{cartItems.length === 0 ? <p className='cart--empty'>No items in cart.</p> : null}
			{cartItems.map(item => (
				<CartItem
					key={item.id}
					item={item}
					addToCart={addToCart}
					removeFromCart={removeFromCart}
				/>
			))}
			<h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
			<Button variant="outlined" style={{ textTransform: 'capitalize' }} onClick={handlePurchase} data-cy={'purchase-button'}>Purchase</Button>
		</Wrapper>
	);
};

export default Cart;
