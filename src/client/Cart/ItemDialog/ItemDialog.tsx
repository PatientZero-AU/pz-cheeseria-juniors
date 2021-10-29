// Types
import { CartItemType } from "../../App";
// Styles
import { DialogImage } from "./ItemDialog.styles";
// Components
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

type Props = {
  item: CartItemType;
  open: boolean;
  onClose: () => void;
  buttonOnClick: () => void;
};

const ItemDialog: React.FC<Props> = ({
  item,
  open,
  onClose,
  buttonOnClick,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{item.title}</DialogTitle>
      <DialogContent>
        <DialogImage src={item.image} alt={item.title} />
        <DialogContentText id="alert-dialog-description">
          {item.description}
        </DialogContentText>
        <DialogActions>
          <strong>${item.price}</strong>
          <Button onClick={buttonOnClick} data-cy={`add-to-cart-${item.id}`}>
            Add to cart
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ItemDialog;
