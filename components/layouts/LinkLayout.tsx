import Container from '@mui/material/Container';

const LinkLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <>
      <Container 
        component="main" 
        maxWidth={false} 
        sx={{
          mt: 12,
          mb: 6,
          minHeight: '50vh',
        }}
      >
        {children}
      </Container>
    </>
  )
}

export default LinkLayout;
