import { Box, Typography ,Modal} from '@material-ui/core';

import React from 'react';

const ItemDetails = () => {
	return (
		<Box sx={style}>
			<Typography id="modal-modal-title" variant="h6" component="h2">
				Text in a modal
			</Typography>
			<Typography id="modal-modal-description" sx={{ mt: 2 }}>
				Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
			</Typography>
		</Box>
	);
};

export default ItemDetails;
