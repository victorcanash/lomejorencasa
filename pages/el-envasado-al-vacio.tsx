import type { NextPage } from 'next';

import { PageTypes } from '@core/constants/navigation';

import { keywords } from '@lib/config/next-seo.config';
import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';
import VacuumBlogComponent from '@components/blogs/vacuum';

const VacuumBlog: NextPage = () => {
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

      <VacuumBlogComponent />
    </>
  );
};

export default VacuumBlog;
