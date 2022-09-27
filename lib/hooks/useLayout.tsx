import { Fragment } from 'react';

import { RouterPaths, routerPathsMainLayout, routerPathsLinkLayout } from '@core/constants/navigation';
import MainLayout from '@components/layouts/MainLayout';
import LinkLayout from '@components/layouts/LinkLayout';

const useLayout = (pathname: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let LayoutComponent: any = Fragment;
  if (routerPathsMainLayout.includes(pathname as RouterPaths)) {
    LayoutComponent = MainLayout;
  } else if (routerPathsLinkLayout.includes(pathname as RouterPaths)) {
    LayoutComponent = LinkLayout;
  }

  return {
    LayoutComponent,
  };
};

export default useLayout;
