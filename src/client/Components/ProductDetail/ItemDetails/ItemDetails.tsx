import React from 'react';
//UI
import { Typography, Dialog, Paper, Tooltip } from '@material-ui/core';

//style
import { StyledItemDetails } from './ItemDetails.styles';


interface ItemDetailsProps {
	openCheeseModal: boolean;
	setOpenCheeseModal: Function;
	selectedCheese: any;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({ openCheeseModal, setOpenCheeseModal, selectedCheese }) => {
	return (
		<Dialog
			open={openCheeseModal}
			onClose={() => setOpenCheeseModal(false)}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<StyledItemDetails>
				<Paper variant="outlined" className={`image--wrapper`}>
					<img alt={`an image `} src={`${selectedCheese.image}`} />
					<Typography id="modal-item-title" variant="h6" component="h2" className={`item--title`}>
						{selectedCheese.title}
					</Typography>
				</Paper>
				<Tooltip title={`${selectedCheese.ca}`} placement="top" >
					<Typography id="modal-item-description" component={"p"} className={`item--description`}>
						{selectedCheese.description}
					</Typography>
				</Tooltip>
				<Typography id="modal-item-price" component={"p"} className={`item--price`}>
					{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(selectedCheese.price)}
				</Typography>
			</StyledItemDetails>
		</Dialog>
	);
};

export default ItemDetails;
