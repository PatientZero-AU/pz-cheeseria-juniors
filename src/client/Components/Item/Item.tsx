import React, { SetStateAction, Dispatch, SyntheticEvent } from 'react';
import Button from '@material-ui/core/Button';

// Types
import { CartItemType ,ICartItem} from '../../types';

// Styles
import { Wrapper } from './Item.styles';

type Props = {
	item: CartItemType;
	handleAddToCart: (e: SyntheticEvent, clickedItem: CartItemType) => void;
	setOpenCheeseModal: Dispatch<SetStateAction<boolean>>;
	setSelectedCheese: Dispatch<SetStateAction<ICartItem | undefined>>;
};

const Item: React.FC<Props> = ({ item, handleAddToCart, setOpenCheeseModal, setSelectedCheese }) => {
	const handletoggleModal = (cheese: ICartItem) => {
		setSelectedCheese(cheese);
		setOpenCheeseModal(true);
	};

	return (
		<Wrapper onClick={() => handletoggleModal(item)}>
			<img src={item.image} alt={item.title} />
			<div>
				<h3>{item.title}</h3>
				<h3>${item.price}</h3>
			</div>
			<Button
				onClick={(e) => handleAddToCart(e, item)}
				data-cy={`add-to-cart-${item.id}`}>Add to cart</Button>
		</Wrapper>
	);
};

export default Item;