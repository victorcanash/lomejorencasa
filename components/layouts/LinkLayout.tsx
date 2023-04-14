import { ReactNode } from 'react';

import MainComponent from '@components/layouts/MainComponent';

const LinkLayout = ({ children }: { children: ReactNode }) => {

  return (
    <>
      <MainComponent>
        {children}
      </MainComponent>
    </>
  );
};

export default LinkLayout;
