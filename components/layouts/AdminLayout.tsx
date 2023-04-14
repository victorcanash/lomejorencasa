import { ReactNode } from 'react';

import MainComponent from '@components/layouts/MainComponent';
import NavBar from '@components/NavBar';

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
