import { FormattedMessage } from 'react-intl'

import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import { useCartContext } from '@core/contexts/CartContext'
import Divider from '@core/components/ui/Divider'
import CartDetail from '@core/components/CartDetail'

interface CartDrawerProps {
  minHeight: string
}

const CartDrawer = (props: CartDrawerProps) => {
  const {
    minHeight
  } = props

  const {
    drawerOpen,
    handleDrawerOpen
  } = useCartContext()

  return (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={handleDrawerOpen}
      sx={{
        flexShrink: 0
      }}
      PaperProps={{
        sx: {
          backgroundColor: 'primary.main'
        }
      }}
    >
      <Toolbar
        variant="dense"
        disableGutters
        sx={{
          minHeight
        }}
      />
      <Box
        sx={{
          overflow: 'auto',
          width: {
            xs: '100vw',
            sm: '600px'
          },
          p: '16px'
        }}
      >
        {/* Title */}
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography component="div" variant="h2" p="10px">
              <FormattedMessage id="cart.h1" />
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              onClick={handleDrawerOpen}
            >
              <CloseIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
        <Divider
          mb={3}
        />
        {/* Cart Detail */}
        <CartDetail />
      </Box>
    </Drawer>
  )
}

export default CartDrawer
