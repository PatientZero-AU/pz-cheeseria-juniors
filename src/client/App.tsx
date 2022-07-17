import React, { useState } from 'react';
import { useQuery } from 'react-query';
// Components
import Item from './Cart/Item/Item';
import Cart from './Cart/Cart';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RestoreIcon from '@material-ui/icons/Restore';
import Badge from '@material-ui/core/Badge';
// Styles
import {
  HeaderTypography,
  StyledAppBar,
  StyledButton,
  Wrapper,
} from './App.styles';
import { Toolbar, Typography } from '@material-ui/core';
import ItemDetails from './Cart/ItemDetails/ItemDetails';

// Types
export interface Item {
  id: number;
  price: number;
  title: string;
  image: string;
  category: string;
  description: string;
}

export interface CartItemType extends Item {
  amount: number;
}

export type PurchasingItem = Pick<CartItemType, 'id' | 'amount' | 'price'>;

const purchasingItemMapper = (cartItems: CartItemType[]): PurchasingItem[] => {
  const purchasingItemsArray: PurchasingItem[] = [];
  cartItems.forEach((item) => {
    purchasingItemsArray.push({
      id: item.id,
      amount: item.amount,
      price: item.price,
    });
  });
  return purchasingItemsArray;
};

const getCheeses = async (): Promise<CartItemType[]> =>
  await (await fetch(`api/cheeses`)).json();

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const [isItemDetailsVisible, setIsItemDetailsVisible] = useState(false);
  const [displayingItem, setDisplayingItem] = useState<CartItemType | null>(
    null
  );

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'cheeses',
    getCheeses
  );
  console.log(data);

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
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
    setCartItems((prev) =>
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

  const handleItemClick = (item: CartItemType) => {
    setIsItemDetailsVisible((prep) => true);
    setDisplayingItem((prep) => item);
  };
  const handleDetailsClose = () => {
    setIsItemDetailsVisible((prep) => false);
    setDisplayingItem((prep) => null);
  };
  const handleClickToPurchase = async () => {
    try {
      const sendOrderRes = await fetch('api/orders', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ newOrder: purchasingItemMapper(cartItems) }),
      });
      if (sendOrderRes && sendOrderRes.status === 200) {
        setCartOpen(false);
      } else {
    } catch (err) {
    }
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
            <StyledButton>
              <RestoreIcon />
              <Typography variant="subtitle2">Recent Purchases</Typography>
            </StyledButton>

            <HeaderTypography variant="h3" noWrap>
              Welcome to Patient Zero's Cheeseria
            </HeaderTypography>

            <StyledButton onClick={() => setCartOpen(true)}>
              <Badge
                badgeContent={getTotalItems(cartItems)}
                color="error"
                data-cy="badge-count"
              >
                <AddShoppingCartIcon />
              </Badge>

              <Typography variant="subtitle2">Cart</Typography>
            </StyledButton>
          </Grid>
        </Toolbar>
      </StyledAppBar>

      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
          clickToPurchase={handleClickToPurchase}
        />
      </Drawer>

      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item
              item={item}
              handleAddToCart={handleAddToCart}
              handleItemClick={handleItemClick}
            />
          </Grid>
        ))}
      </Grid>
      {isItemDetailsVisible && displayingItem && (
        <ItemDetails
          item={displayingItem}
          isItemDetailsVisible={isItemDetailsVisible}
          handleDetailsClose={handleDetailsClose}
        />
      )}
    </Wrapper>
  );
};

export default App;
