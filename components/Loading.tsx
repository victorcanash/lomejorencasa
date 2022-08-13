import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';

const Loading = () => {
  return (
    <Container 
      className="above-layout"
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.7)', 
      }}
    >
      <CircularProgress 
        size='60px' 
        sx={{
          color: 'primary.main'
        }}
        
      />
    </Container>
  );
};

export default Loading;
