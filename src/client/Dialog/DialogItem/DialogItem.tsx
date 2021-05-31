import Button from '@material-ui/core/Button';
// Types
import { CartItemType } from '../../App';
// Styles
import { Wrapper } from './DialogItem.styles';

type Props = {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void;
};

const DialogItem: React.FC<Props> = ({ item, handleAddToCart }) => (
    <Wrapper>
        <img src={item.image} alt={item.title} />
        <div>
            <h3>{item.title}</h3>
            <h3>Category: {item.category}</h3>
            <h3>{item.description}</h3>
            <h3>Price: ${item.price}</h3>
        </div>
        <Button
            onClick={() => handleAddToCart(item)}
            data-cy={`add-to-cart-${item.id}`}>Add to cart</Button>
    </Wrapper>
);

export default DialogItem;