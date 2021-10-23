import { Wrapper } from './OrderItem.styles';
import { IOrder } from '../../types';
import { Fragment } from 'react';
import { formatPrice } from '../../utils/formatPrice';

type Props = {
	order: IOrder;
};

const OrderItem: React.FC<Props> = ({ order }) => {
	return (
		<Wrapper>
			{order.items.map(item => (
				<Fragment key={item.id}>
					<div>
						<h3>{item.title}</h3>
						<div className='order-information'>
							<p>Price: ${item.price}</p>
						</div>
						<p>Purchased Quantity: {item.amount}</p>
					</div>
					<img src={item.image} alt={item.title} />
				</Fragment>))}
			<h2>Total: {formatPrice(order.totalPrice)}</h2>
		</Wrapper>
	);
};

export default OrderItem;