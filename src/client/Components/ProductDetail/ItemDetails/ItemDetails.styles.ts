import styled from "styled-components";

export const StyledItemDetails = styled.div`
	padding: 14px;
	display: flex;
	flex-direction: column;
	.image--wrapper {
		position: relative;
		width: 100%;
		height: 60%;
		img {
			width: 100%;
		}
		.item--title {
			color: white;
			position: absolute;
			left: 1rem;
			bottom: 1rem;
		}
	}
`;
