import { ReactNode } from 'react';

import MainComponent from '@core/components/layouts/MainComponent';
import NavBar from '@core/components/NavBar';

const AdminLayout = ({ children }: { children: ReactNode }) => {

  return (
    <>
      <NavBar />
      <MainComponent>
        {children}
      </MainComponent>
    </>
  );
};

export default AdminLayout;
