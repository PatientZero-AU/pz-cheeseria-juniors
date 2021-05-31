import Button from '@material-ui/core/Button';
import { MouseEventHandler } from 'react';
// Types
import { CartItemType } from '../../App';
// Styles
import { Wrapper } from './Item.styles';

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
  handleItemSelect: (selectedItem: CartItemType) => MouseEventHandler;
};

const Item: React.FC<Props> = ({ item, handleAddToCart, handleItemSelect }) => (
  <Wrapper>
    <img src={item.image} alt={item.title} onClick={handleItemSelect(item)} />
    <div onClick={handleItemSelect(item)}>
      <h3>{item.title}</h3>
      <h3>${item.price}</h3>
    </div>
    <Button
      onClick={() => handleAddToCart(item)}
      data-cy={`add-to-cart-${item.id}`}>Add to cart</Button>
  </Wrapper>
);

export default Item;
