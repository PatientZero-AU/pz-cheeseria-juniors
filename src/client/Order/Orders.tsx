import React from 'react';
import { useQuery } from 'react-query';
// Material UI
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  LinearProgress,
} from '@material-ui/core';
// Component
// Styles
import { Wrapper } from './Orders.styles';
//Types
import { PurchasingItem, IOrder, RestResponse } from '../App';
// interface Order {
//   id: number;
//   price: number;
//   amount: number;
// }
const getOrders = async () => (await fetch('api/orders')).json();

const Orders: React.FC = () => {
  const { data, isLoading, error } = useQuery<RestResponse<IOrder>>(
    'orders',
    getOrders
  );

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;
  return (
    <Wrapper>
      <h2>Recent Purchases</h2>
      <div>
        {!data?.data?.length ? <p>No recent purchase order</p> : null}
        {data?.data?.map((order: IOrder) => (
          <div className="order-card">
            <Card>
              <CardHeader title="Order Details:" />
              {order.map((item: PurchasingItem) => (
                <CardContent>
                  <p>ID: {item.id}</p>
                  <p>Price: {item.price}</p>
                  <p>Amount: {item.amount}</p>
                </CardContent>
              ))}
            </Card>
            <Divider />
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default Orders;
