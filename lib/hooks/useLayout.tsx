import { pages } from '@core/config/navigation.config';
import { PageTypes } from '@core/constants/navigation';
import MainLayout from '@components/layouts/MainLayout';
import LinkLayout from '@components/layouts/LinkLayout';
import AdminLayout from '@components/layouts/AdminLayout';

const useLayout = (pathname: string) => {
  let LayoutComponent = MainLayout;
  for (const [, page] of Object.entries(pages)) {
    if (page.filepath == pathname) {
      if (page.type == PageTypes.link) {
        LayoutComponent = LinkLayout;
      } else if (page.type == PageTypes.admin) {
        LayoutComponent = AdminLayout;
      }
      break;
    }
  }
  
  return {
    LayoutComponent,
  };
};

export default useLayout;
