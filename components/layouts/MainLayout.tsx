import { useRouter } from 'next/router';

import { useAppContext } from '@lib/contexts/AppContext';
import useApp from '@lib/hooks/useApp';
import useLayout from '@lib/hooks/useLayout';
import Loading from '@components/Loading';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { initialized } = useAppContext();

  const router = useRouter();

  const { LayoutComponent } = useLayout(router.pathname);

  const app = useApp(LayoutComponent);

  return (
    <div className="app" style={initialized ? {pointerEvents: 'auto'} : {pointerEvents: 'none'}}>
      <Loading />
      <LayoutComponent>
        {children}
      </LayoutComponent>
    </div>
  )
}

export default MainLayout;
