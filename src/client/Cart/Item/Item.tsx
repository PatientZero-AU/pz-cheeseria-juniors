import { useState } from "react";
// Types
import { CartItemType } from "../../App";
// Styles
import { Wrapper } from "./Item.styles";
// Components
import { Button } from "@material-ui/core";
import ItemDialog from "../ItemDialog/ItemDialog";

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div>
      <ItemDialog
        item={item}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        buttonOnClick={() => handleAddToCart(item)}
      />
      <Wrapper onClick={() => setDialogOpen(true)}>
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
    </div>
  );
};

export default Item;
