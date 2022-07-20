import * as React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
// Components
import { Drawer, Grid, LinearProgress, Snackbar } from '@material-ui/core';
import Item from './Cart/Item/Item';
import Cart from './Cart/Cart';
import ItemDetails from './Cart/ItemDetails/ItemDetails';
import Orders from './Order/Orders';
import Navbar from './Navbar';
// Types
export interface Item {
  id: number;
  price: number;
  title: string;
  image: string;
  category: string;
  description: string;
}
// Styles
import { Wrapper } from './App.styles';

export interface CartItemType extends Item {
  amount: number;
}

// PurchasingItem is the type of data we send back to server
// to create new order as we do not need to send other extra details.
export type PurchasingItem = Pick<CartItemType, 'id' | 'amount' | 'price'>;
export type OrderType = Array<PurchasingItem>;

export interface RestResponse<T> {
  success: boolean;
  message: string;
  data?: T[];
}

/**
 * @desc Mapping CartItems into PurchasingItems
 * @returns PurchasingItem[] to send to api to create new order
 * @param cartItems
 */
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
    setIsItemDetailsVisible(() => true);
    setDisplayingItem(() => item);
  };
  const handleDetailsClose = () => {
    setIsItemDetailsVisible(() => false);
    setDisplayingItem(() => null);
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
      const sendOrderResp: RestResponse<OrderType> = await sendOrderRes.json();
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
      <Navbar
        totalItems={getTotalItems(cartItems)}
        openCart={() => setCartOpen(true)}
        openRecentPurchases={() => setRecentPurchasesOpen(true)}
      />
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
