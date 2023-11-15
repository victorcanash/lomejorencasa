import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

interface LoadingProps {
  open: boolean
}

const Loading = (props: LoadingProps) => {
  const { open } = props

  return (
    <Backdrop
      sx={{
        zIndex: (theme) => theme.zIndex.modal + 5
      }}
      open={open}
    >
      <CircularProgress
        size='60px'
      />
    </Backdrop>
  )
}

export default Loading
