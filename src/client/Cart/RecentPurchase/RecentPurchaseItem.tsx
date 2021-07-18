// Types
import { CartItemType } from '../../App';
// Styles
import { Wrapper } from './RecentPurchase.styles';

type Props = {
  item: CartItemType;
};

const RecentPurchaseItem: React.FC<Props> = ({ item }) => (
  <Wrapper>
    <div>
      <h3>{item.title}</h3>
      <div className='information'>
            <p><img src={item.image} alt={item.title} width="50%" height ="50%"/></p>
            <p><b>Price:</b> ${item.price}</p>
            <p><b>Description:</b> {item.description}</p>
            <p><b>Category:</b> {item.category}</p>
      </div>
    </div>
    
  </Wrapper>
);

export default RecentPurchaseItem;
