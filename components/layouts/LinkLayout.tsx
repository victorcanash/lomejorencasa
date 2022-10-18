import Container from '@mui/material/Container';

const LinkLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <>
      <Container 
        component="main" 
        maxWidth={false} 
        sx={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          display: 'flex',
          placeContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {children}
      </Container>
    </>
  )
}

export default LinkLayout;
