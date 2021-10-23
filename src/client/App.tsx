import React, { useState, SyntheticEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
// Components
import Item from './Components/Item/Item';
import Cart from './Components/Cart/Cart';
import ItemDetails from './Components/ProductDetail/ItemDetails';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RestoreIcon from '@material-ui/icons/Restore';
import Badge from '@material-ui/core/Badge';
import Notification from './Components/Notification';

// Styles
import { Wrapper, StyledButton, StyledAppBar, HeaderTypography } from './App.styles';
import { Toolbar, Typography } from '@material-ui/core';

import RecentOrderList from './Components/Order/RecentOrderList';
// Types
import { CartItemType } from './types';


import { IOrder } from './types';

interface State {
	order: { orders: IOrder[]; };
}

const getCheeses = async (): Promise<CartItemType[]> =>
	await (await fetch(`api/cheeses`)).json();


// -- main, cart, purchase
const App = () => {
	const [cartOpen, setCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([] as CartItemType[]);
	const { data, isLoading, error } = useQuery<CartItemType[]>(
		'cheeses',
		getCheeses
	);
	const [openCheeseModal, setOpenCheeseModal] = useState(false);
	const [selectedCheese, setSelectedCheese] = useState<CartItemType>();
	const [openRecentPurchaseModal, setOpenRecentPurchaseModal] = useState<boolean>(false);

	const dispatch = useDispatch();

	useEffect(() => {
		if (openRecentPurchaseModal == true) {
			dispatch({
				type: "FETCH_ORDERS"
			});
		}
	}, [openRecentPurchaseModal]);

	const orders: IOrder[] = useSelector((state: State) => state.order.orders);
	const isOrderReceived = useSelector((state: any) => state.order.isOrderReceived);

	const getTotalItems = (items: CartItemType[]) =>
		items.reduce((ack: number, item) => ack + item.amount, 0);

	const handleAddToCart = (e: SyntheticEvent, clickedItem: CartItemType) => {
		e.stopPropagation();
		setCartItems(prev => {
			// 1. Is the item already added in the cart?
			const isItemInCart = prev.find(item => item.id === clickedItem.id);
			if (isItemInCart) {
				return prev.map(item =>
					item.id === clickedItem.id
						? { ...item, amount: item.amount + 1 }
						: item
				);
			}
			// First time the item is added
			return [...prev, { ...clickedItem, amount: 1 }];
		});
	};

	const handleRemoveFromCart = (id: number) => {
		setCartItems(prev =>
			prev.reduce((ack, item) => {
				if (item.id === id) {
					if (item.amount === 1) return ack;
					return [...ack, { ...item, amount: item.amount - 1 }];
				} else {
					return [...ack, item];
				}
			}, [] as CartItemType[])
		);
	};

	if (isLoading) return <LinearProgress />;
	if (error) return <div>Something went wrong ...</div>;

	return (
		<Wrapper>
			<StyledAppBar position="static">
				<Toolbar>
					<Grid
						container
						direction="row"
						justify="space-between"
						alignItems="center"
					>
						<StyledButton onClick={() => {
							setOpenRecentPurchaseModal(true);
						}}>
							<RestoreIcon />
							<Typography variant="subtitle2" ata-cy='open-order'>
								Recent Purchases
							</Typography>
						</StyledButton>

						<HeaderTypography variant="h3" noWrap>
							Welcome to Patient Zero's Cheeseria
						</HeaderTypography>

						<StyledButton onClick={() => setCartOpen(true)} data-cy='open-cart'>
							<Badge
								badgeContent={getTotalItems(cartItems)}
								color='error'
								data-cy="badge-count">
								<AddShoppingCartIcon />
							</Badge>

							<Typography variant="subtitle2">
								Cart
							</Typography>
						</StyledButton>
					</Grid>
				</Toolbar>
			</StyledAppBar>

			<Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
				<Cart
					cartItems={cartItems}
					addToCart={handleAddToCart}
					removeFromCart={handleRemoveFromCart}
					setCartItems={setCartItems}
				/>
			</Drawer>

			<Drawer anchor='left' open={openRecentPurchaseModal} onClose={() => setOpenRecentPurchaseModal(false)}>
				<RecentOrderList orders={orders} />
			</Drawer>

			<Grid container spacing={3}>
				{data?.map(item => (
					<Grid item key={item.id} xs={12} sm={4}>
						<Item item={item} handleAddToCart={handleAddToCart} setOpenCheeseModal={setOpenCheeseModal} setSelectedCheese={setSelectedCheese} />
					</Grid>
				))}
			</Grid>

			{selectedCheese && selectedCheese.title && (<ItemDetails
				openCheeseModal={openCheeseModal}
				setOpenCheeseModal={setOpenCheeseModal}
				selectedCheese={selectedCheese}
			/>)}

			{isOrderReceived === 'succeed' ? <Notification message='We have received your order' /> : null}
		</Wrapper>
	);
};

export default App;
