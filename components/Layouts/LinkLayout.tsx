import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import { useAppContext } from '@lib/contexts/AppContext';
import useApp from '@lib/hooks/useApp';
import Loading from '@components/Loading';
import Header from '@components/NavBar';
import Footer from '@components/Footer';

const LinkLayout = ({ children }: { children: React.ReactNode }) => {
  const { initialized } = useAppContext();

  const app = useApp(false);

  return (
    <div className="app" style={initialized ? {pointerEvents: 'auto'} : {pointerEvents: 'none'}}>
      <Loading />
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
    </div>
  )
}

export default LinkLayout;
