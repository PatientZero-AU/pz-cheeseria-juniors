import { useEffect } from "react";

import CartItem from "./CartItem/CartItem";
import { Wrapper } from "./Cart.styles";
import { CartItemType } from "../App";
import { Button } from "@material-ui/core";
import { useMutation, useQuery } from "react-query";

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

const Cart: React.FC<Props> = ({
  cartItems,
  addToCart,
  removeFromCart,
  clearCart,
}) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  const createOrder = async (newOrder: CartItemType[]) => {
    const OrderItems = newOrder.map((item) => ({
      id: item.id,
      amount: item.amount,
    }));

    const res = await fetch("api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(OrderItems),
    });
    return res;
  };

  const { mutate, isLoading, isSuccess } = useMutation(createOrder);

  useEffect(() => {
    if (isSuccess) {
      clearCart();
    }
  }, [isSuccess]);

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
      <Button
        fullWidth={true}
        disabled={isLoading}
        onClick={() => {
          mutate(cartItems);
        }}
      >
        Purchase
      </Button>
    </Wrapper>
  );
};

export default Cart;
