import { pages } from '@lib/constants/navigation';
import { PageTypes } from '@core/constants/navigation';
import WebLayout from '@components/layouts/WebLayout';
import LinkLayout from '@components/layouts/LinkLayout';
import AdminLayout from '@components/layouts/AdminLayout';

const useLayout = (pathname: string) => {
  let LayoutComponent = WebLayout;
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
