import * as React from 'react';

// material-ui
import {
  useMediaQuery,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
  useTheme,
} from '@material-ui/core';
// Types
import { CartItemType } from '../../App';
// Styles
import { ItemDetailsWrapper } from './ItemDetails.styles';

type Props = {
  item: CartItemType;
  isItemDetailsVisible: boolean;
  handleDetailsClose: () => void;
};

const ItemDetails: React.FC<Props> = ({
  item,
  isItemDetailsVisible,
  handleDetailsClose,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isItemDetailsVisible}
      onClose={handleDetailsClose}
      aria-labelledby="responsive-dialog-title"
    >
      <ItemDetailsWrapper>
        <DialogTitle disableTypography id="responsive-dialog-title">
          <Typography variant="h4">{item.title}</Typography>
        </DialogTitle>
        <DialogContent>
          <h5>ID</h5>
          <p>{item.id}</p>
          <h5>Category</h5>
          <p>{item.category}</p>
          <h5>Description</h5>
          <p>{item.description}</p>
          <h5>Price</h5>
          <p>{item.price}</p>
          <h5>Image</h5>
          <img className="item-image" src={item.image} alt={item.title} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetailsClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </ItemDetailsWrapper>
    </Dialog>
  );
};

export default ItemDetails;
