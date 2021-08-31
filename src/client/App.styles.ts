import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AppBar, Typography, withStyles } from '@material-ui/core';

export const Wrapper = styled.div`
  margin: 40px;
`;

export const DialogImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const StyledDialogTitle = styled(DialogTitle)`
  padding-left: 0;
  padding-right: 0;
`;

export const DialogText = styled.p``;

// export const StyledButton = styled(IconButton)`

// `;

export const StyledButton = withStyles({
  label: {
    flexDirection: 'column',
  },
})(IconButton);

export const StyledAppBar = styled(AppBar)`
  background: white;
  margin-bottom: 15px;
  border-radius: 20px;
`;

export const HeaderTypography = withStyles({
  root: {
    color: 'black',
    WebkitTextStroke: '0.5px darkgoldenrod',
    fontStyle: 'italic',
  },
})(Typography);
