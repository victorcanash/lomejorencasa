import Rating from '@mui/material/Rating'
import CircularProgress from '@mui/material/CircularProgress'

const LoadingRating = () => {
  return (
    <Rating
      value={5}
      icon={<CircularProgress color="inherit" size={17} sx={{ m: '4px' }} />}
      readOnly
      sx={{ mb: '7px' }}
    />
  )
}

export default LoadingRating
