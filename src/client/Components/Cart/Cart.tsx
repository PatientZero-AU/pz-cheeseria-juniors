import CartItem from './CartItem/CartItem';
import { Wrapper } from './Cart.styles';
import { CartItemType } from '../../App';
import { SyntheticEvent } from 'react';
import { Button } from '@material-ui/core';
import request from '../../utils/request'

type Props = {
	cartItems: CartItemType[];
	addToCart: (e: SyntheticEvent, clickedItem: CartItemType) => void;
	removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
	const calculateTotal = (items: CartItemType[]) =>
		items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

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
			<Button variant="outlined">Purchase</Button>
		</Wrapper>
	);
};

export default Cart;


// [
//     {
//         "_id": "616df88538ef1f23e9e1cf77",
//         "id": 2,
//         "title": "ABBAYE DU MONT DES CATS",
//         "price": 29.21,
//         "description": "The Abbaye du Mont des Cats cheese is made by monks in a monastery of the same name in the town of Godewaersvelde, in Northern France. Cow's milk from local farms is used and the milk is gently pasteurised for cheese production. The maturation process takes about 4 to 5 weeks",
//         "category": "semi-soft, artisan, brined",
//         "image": "https://www.cheese.com/media/img/cheese/Mont_des_Cats_kaas.jpg",
//         "amount": 4
//     },
//     {
//         "_id": "616df88538ef1f23e9e1cf78",
//         "id": 3,
//         "title": "ADELOST",
//         "price": 367.55,
//         "description": "Adelost is a Swedish blue cheese made from cow's milk. The blue-grey veins running throughout are a distinctive feature of the cheese. It has a sharp, salty and tangy flavour. The ripening process is for two to three months. The cheese comes in a drum shape with a rind of pale cream, which is lightly dotted with moulds.",
//         "category": "semi-soft, blue-veined",
//         "image": "https://www.cheese.com/media/img/cheese/Adelost_QnxYLx6.jpg",
//         "amount": 4
//     }
// ]