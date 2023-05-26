import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

import { PageTypes } from '@core/constants/navigation';

import { pages } from '@lib/config/navigation.config';
import WebLayout from '@components/layouts/WebLayout';
import LinkLayout from '@components/layouts/LinkLayout';
import AdminLayout from '@components/layouts/AdminLayout';

const useLayout = (children: React.ReactNode) => {
  const router = useRouter();

  const [pageType, setPageType] = useState<PageTypes | undefined>(undefined);
  const [layout, setLayout] = useState<JSX.Element | undefined>(undefined);

  const checkLayout = useCallback(() => {
    let foundPage = false;
    for (const [, page] of Object.entries(pages)) {
      if (page.filepath == router.pathname) {
        foundPage = true;
        setPageType(page.type);
        if (page.type == PageTypes.link) {
          setLayout(
            <LinkLayout>
              { children }
            </LinkLayout>
          );
          return;
        } else if (page.type == PageTypes.admin) {
          setLayout(
            <AdminLayout>
              { children }
            </AdminLayout>
          );
          return;
        }
        break;
      }
    };
    if (!foundPage) {
      setPageType(PageTypes.notFound);
    }
    setLayout(
      <WebLayout>
        { children }
      </WebLayout>
    );
  }, [children, router.pathname]);

  useEffect(() => {
    checkLayout();
  }, [checkLayout]);
  
  return {
    layout: layout,
    pageType: pageType,
  };
};

export default useLayout;
