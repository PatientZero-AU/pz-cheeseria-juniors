import * as React from 'react';
// Components
import { Badge, Grid, Toolbar, Typography } from '@material-ui/core';
import RestoreIcon from '@material-ui/icons/Restore';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
// Styles
import { HeaderTypography, StyledAppBar, StyledButton } from './App.styles';

type Props = {
  totalItems: number;
  openCart: () => void;
  openRecentPurchases: () => void;
};

const Navbar: React.FC<Props> = ({
  totalItems,
  openCart,
  openRecentPurchases,
}) => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <StyledButton onClick={() => openRecentPurchases()}>
            <RestoreIcon />
            <Typography variant="subtitle2" data-cy="recent-purchases">
              Recent Purchases
            </Typography>
          </StyledButton>

          <HeaderTypography variant="h3" noWrap>
            Welcome to Patient Zero&apos;s Cheeseria
          </HeaderTypography>

          <StyledButton data-cy="go-to-cart" onClick={() => openCart()}>
            <Badge
              badgeContent={totalItems}
              color="error"
              data-cy="badge-count"
            >
              <AddShoppingCartIcon />
            </Badge>

            <Typography variant="subtitle2">Cart</Typography>
          </StyledButton>
        </Grid>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
