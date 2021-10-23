import React, { SyntheticEvent } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

export default function Notification({ message }: { message: string; }) {
	const [open, setOpen] = React.useState(true);
	function handleClose(event: SyntheticEvent, reason: any) {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	}

	return (
		<div>
			<Snackbar
				anchorOrigin={{
					vertical: "top",
					horizontal: "left"
				}}
				open={open}
				autoHideDuration={2000}
				onClose={handleClose}
				ContentProps={{
					"aria-describedby": "message-id"
				}}
				message={message}
				action={[
					<IconButton>
						<CloseIcon />
					</IconButton>
				]}
			/>
		</div>
	);
}
