import { FormattedMessage } from 'react-intl'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import type { CartItem } from '@core/types/cart'
import Transition from '@core/components/animations/Transition'
import Button from '@core/components/inputs/Button'

interface CheckedCartDialogProps {
  open: boolean
  handleDialog: () => void
  changedCart: boolean
  changedItemsByInventory: CartItem[]
  message?: string
}

const CheckedCartDialog = (props: CheckedCartDialogProps) => {
  const {
    open,
    handleDialog,
    changedCart,
    changedItemsByInventory,
    message
  } = props

  const handleClickAcceptBtn = () => {
    handleDialog()
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleDialog}
      aria-describedby="checked-cart-dialog"
    >
      <DialogTitle>
        <FormattedMessage id="dialogs.checkedCart.title" />
      </DialogTitle>
      <DialogContent>
        { changedItemsByInventory.length > 0 &&
          <>
            <DialogContentText
              id="checked-cart-dialog"
              mb={1}
            >
              <FormattedMessage id="dialogs.checkedCart.content.changedItems" />
            </DialogContentText>
            { changedItemsByInventory.map((item) => (
              <DialogContentText key={item.id} mb={1}>
                {'-'}
                <FormattedMessage
                  id="dialogs.checkedCart.content.changedItem"
                  values={{
                    productName: item.inventory?.name.current ?? item.pack?.name.current,
                    quantity: item.quantity
                  }}
                />
              </DialogContentText>
            ))}
          </>
        }
        { changedItemsByInventory.length <= 0 && changedCart &&
          <DialogContentText mb={1}>
            <FormattedMessage id="dialogs.checkedCart.content.changedCart" />
          </DialogContentText>
        }
        { (message != null) &&
          <DialogContentText>
            {message}
          </DialogContentText>
        }
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClickAcceptBtn}
        >
          <FormattedMessage id="dialogs.checkedCart.acceptBtn" />
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CheckedCartDialog
