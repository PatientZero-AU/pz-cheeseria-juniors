//style
import { IOrder } from "../../types";
import { StyledRecentOrders } from "./RecentOrder.styles";
import OrderItem from './OrderItem';

interface RecentOrderListProps {
	orders: IOrder[];
	children?: JSX.Element | JSX.Element[];
}

const RecentOrderList: React.FC<RecentOrderListProps> = ({ orders, children }) => {
	return (
		<>
			<h2>Your Order history</h2>
			{orders.length === 0 ? <p>You have not made any order</p> : null}
			{orders.map((order, index) => <OrderItem key={`${order.totalPrice}-${index}`} order={order} />)}
		</>
	);
};

export default RecentOrderList;
