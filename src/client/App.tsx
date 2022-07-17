import * as React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
// Components
import {
  Badge,
  Drawer,
  Grid,
  LinearProgress,
  Snackbar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RestoreIcon from '@material-ui/icons/Restore';
import Item from './Cart/Item/Item';
import Cart from './Cart/Cart';
import ItemDetails from './Cart/ItemDetails/ItemDetails';
import Orders from './Order/Orders';

// Styles
import {
  HeaderTypography,
  StyledAppBar,
  StyledButton,
  Wrapper,
} from './App.styles';

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
export interface IOrder extends Array<PurchasingItem> {}

export interface RestResponse<T> {
  success: boolean;
  message: string;
  data?: T[];
}

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
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [recentPurchasesOpen, setRecentPurchasesOpen] = useState(false);
  const [displayingItem, setDisplayingItem] = useState<CartItemType | null>(
    null
  );
  const [responseMessage, setResponseMessage] = useState<string>('');

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
  const handleClearCart = (): void => {
    setCartItems([]);
    setCartOpen(false);
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
  const handleClickToPurchase = async (): Promise<void> => {
    try {
      const sendOrderRes: Response = await fetch('api/orders', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          purchasingItems: purchasingItemMapper(cartItems),
        }),
      });
      const sendOrderResp: RestResponse<IOrder> = await sendOrderRes.json();
      if (sendOrderResp && sendOrderResp.success) {
        handleClearCart();
        setCartOpen(false);
        setResponseMessage(sendOrderResp.message);
      } else {
        setResponseMessage(sendOrderResp.message || 'Purchase failed!');
      }
    } catch (err) {
      setResponseMessage((err as Error).message);
    } finally {
      setIsSnackbarOpen(true);
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
            <StyledButton onClick={() => setRecentPurchasesOpen(true)}>
              <RestoreIcon />
              <Typography variant="subtitle2" data-cy="recent-purchases">
                Recent Purchases
              </Typography>
            </StyledButton>

            <HeaderTypography variant="h3" noWrap>
              Welcome to Patient Zero's Cheeseria
            </HeaderTypography>

            <StyledButton
              data-cy="go-to-cart"
              onClick={() => setCartOpen(true)}
            >
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
      <Drawer
        anchor="left"
        open={recentPurchasesOpen}
        onClose={() => setRecentPurchasesOpen(false)}
      >
        <Orders />
      </Drawer>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
          clickToPurchase={handleClickToPurchase}
          clearCart={handleClearCart}
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

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isSnackbarOpen}
        onClose={() => setIsSnackbarOpen(false)}
        message={responseMessage}
        autoHideDuration={3000}
        data-cy="response-message"
      />
    </Wrapper>
  );
};

export default App;
