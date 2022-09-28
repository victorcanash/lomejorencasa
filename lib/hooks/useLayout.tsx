import { pages } from '@core/config/navigation.config';
import { PageTypes } from '@core/constants/navigation';
import MainLayout from '@components/layouts/MainLayout';
import LinkLayout from '@components/layouts/LinkLayout';

const useLayout = (pathname: string) => {
  let LayoutComponent = MainLayout;
  for (const [, value] of Object.entries(pages)) {
    if (value.path == pathname) {
      if (value.type == PageTypes.link) {
        LayoutComponent = LinkLayout;
      }
      break;
    }
  }
  
  return {
    LayoutComponent,
  };
};

export default useLayout;
