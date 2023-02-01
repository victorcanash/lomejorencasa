import Box from '@mui/material/Box';

const LinkLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <>
      <Box 
        component="main" 
        sx={{
          mt: '74px',
          mb: '48px',
          minHeight: '50vh',
        }}
      >
        {children}
      </Box>
    </>
  )
}

export default LinkLayout;
