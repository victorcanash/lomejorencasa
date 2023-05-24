import type { NextPage } from 'next';

import { PageTypes } from '@core/constants/navigation';

import { useAppContext } from '@lib/contexts/AppContext';
import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';
import SettingsComponent from '@components/settings';

const Settings: NextPage = () => { 
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
        <SettingsComponent />
      }
    </>
  );
};

export default Settings;
