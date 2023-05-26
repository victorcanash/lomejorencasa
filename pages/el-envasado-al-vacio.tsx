import type { NextPage } from 'next';

import { PageTypes } from '@core/constants/navigation';

import { keywords } from '@lib/config/next-seo.config';
import usePage from '@lib/hooks/usePage';
import PageHeader from '@core/components/pages/PageHeader';
import VacuumBlog from '@components/blogs/vacuum';

const VacuumBlogPage: NextPage = () => {
  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleAdd: keywords.vacuumMachine.main,
          descriptionAdd: keywords.vacuumMachine.main,
        }}
        marginTop={true}
        texts={{
          title: {
            id: 'home.intro.title',
          },
        }}
      />

      <VacuumBlog />
    </>
  );
};

export default VacuumBlogPage;
