import type { NextPage } from 'next';

import { PageTypes } from '@core/constants/navigation';

import { useAppContext } from '@core/contexts/AppContext';
import usePage from '@core/hooks/usePage';
import PageHeader from '@core/components/pages/PageHeader';
import Settings from '@core/components/Settings';

const SettingsPage: NextPage = () => { 
  const { initialized } = useAppContext();

  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'settings.metas.title',
          descriptionId: 'settings.metas.description',
          noindex: true,
          nofollow: true,
        }}
        marginTop={true}
        texts={{
          title: {
            id: 'settings.h1',
          },
        }}
      />

      { initialized && page.checked &&
        <Settings />
      }
    </>
  );
};

export default SettingsPage;
