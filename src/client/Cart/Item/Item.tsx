import Button from '@material-ui/core/Button';

// Styles
import { Wrapper } from './Item.styles';

// Item types
import { Props } from './item.types';

const Item: React.FC<Props> = ({ item, handleAddToCart, handleOpenDialog }) => (
  <Wrapper
    data-testid="cheese-cards"
    onClick={() => {
      handleOpenDialog(item);
    }}
  >
    <img src={item.image} alt={item.title} />
    <div>
      <h3>{item.title}</h3>
      <h3>${item.price}</h3>
    </div>
    <Button
      onClick={() => handleAddToCart(item)}
      data-cy={`add-to-cart-${item.id}`}
    >
      Add to cart
    </Button>
  </Wrapper>
);

export default Item;
