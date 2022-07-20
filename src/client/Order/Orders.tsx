import * as React from 'react';
import { useQuery } from 'react-query';
// Component
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  LinearProgress,
} from '@material-ui/core';
//Types
import { PurchasingItem, RestResponse } from '../App';
// Styles
import { Wrapper } from './Orders.styles';

interface IOderModel {
  orderId: number;
  items: PurchasingItem[];
}

const getOrders = async () => (await fetch('api/orders')).json();

const Orders: React.FC = () => {
  const { data, isLoading, error } = useQuery<RestResponse<IOderModel>>(
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
        {data?.data?.map((order: IOderModel, index: number) => (
          <div key={index} className="order-card">
            <Card>
              <CardHeader title={`Order ID: ${order.orderId}`} />
              <p>Items in order:</p>
              {order.items.map((item: PurchasingItem) => (
                <CardContent key={item.id}>
                  <p>
                    {index}ID:
                    <span
                      data-cy={`${index === 0 ? 'latest-' : ''}order-item-id-${
                        item.id
                      }`}
                    >
                      {item.id}
                    </span>
                  </p>
                  <p>Price: {item.price}</p>
                  <p>
                    Amount:
                    <span
                      data-cy={`${
                        index === 0 ? 'latest-' : ''
                      }order-item-amount-${item.id}`}
                    >
                      {item.amount}
                    </span>
                  </p>
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
