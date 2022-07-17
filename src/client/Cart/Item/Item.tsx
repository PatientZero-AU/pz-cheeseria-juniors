import * as React from 'react';

import Button from '@material-ui/core/Button';
// Types
import { CartItemType } from '../../App';
// Styles
import { Wrapper } from './Item.styles';

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
  handleItemClick: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart, handleItemClick }) => (
  <Wrapper>
    <div className="card-content" onClick={() => handleItemClick(item)}>
      <img className="card-image" src={item.image} alt={item.title} />
      <div className="card-details">
        <h3>{item.title}</h3>
        <h3>${item.price}</h3>
      </div>
    </div>
    <Button
      className="card-button"
      onClick={() => handleAddToCart(item)}
      data-cy={`add-to-cart-${item.id}`}
    >
      Add to cart
    </Button>
  </Wrapper>
);

export default Item;
