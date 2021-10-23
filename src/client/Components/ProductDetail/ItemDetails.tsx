import React from 'react';
//UI
import { Typography, Dialog, Paper, Tooltip } from '@material-ui/core';

//style
import { StyledItemDetails } from './ItemDetails.styles';

//util
import {formatPrice} from '../../utils/formatPrice'


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
				<Tooltip title={<p style={{ fontSize: "1.5rem", color: "#d8d7d5" }}>{selectedCheese.category}</p>} placement="bottom">
					<Paper variant="outlined" className={`image--wrapper`}>
						<img alt={`an image `} src={`${selectedCheese.image}`} />
						<Typography id="modal-item-title" variant="h6" component="h2" className={`item--title`}>
							{selectedCheese.title}
						</Typography>
					</Paper>
				</Tooltip>
				<Typography id="modal-item-description" component={"p"} className={`item--description`}>
					{selectedCheese.description}
				</Typography>

				<Typography id="modal-item-price" component={"p"} className={`item--price`}>
					{formatPrice(selectedCheese.price)}
				</Typography>
			</StyledItemDetails>
		</Dialog>
	);
};

export default ItemDetails;
