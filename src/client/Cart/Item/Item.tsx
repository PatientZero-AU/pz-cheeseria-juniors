import React from 'react';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

// Types
import { CartItemType } from '../../App';
// Styles
import { Wrapper } from './Item.styles';

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
}; 

const Item: React.FC<Props> = ({ item, handleAddToCart }) => {
  const [dialogState, setDialogState] = React.useState<boolean>(false);
  const handleClose = () => {
    setDialogState(false);
  };
  return (
  <Wrapper>
    <img src={item.image} alt={item.title}  onClick={() => {
          setDialogState(true);
        }}/> 
    <div>
      <h3>{item.title}</h3>
      <h3>${item.price}</h3>
    </div>
    <Button
      onClick={() => handleAddToCart(item)}
      data-cy={`add-to-cart-${item.id}`}>Add to cart</Button>

    <Dialog open={dialogState} onClose={() => setDialogState(false)}>
        <DialogTitle>{item.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <img alt={item.title} src={item.image} width="50%" height ="50%"/>
          </DialogContentText>
          <DialogContentText>
            <b>Price : </b>${item.price} 
          </DialogContentText>
          <DialogContentText>
            <b>Description : </b>{item.description}  
          </DialogContentText>
          <DialogContentText>
            <b>Category : </b>{item.category}  
          </DialogContentText>
        </DialogContent> 
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>Close</Button>
        </DialogActions>
      </Dialog>
  </Wrapper>
  );
};

export default Item;
