import type { NextPage } from 'next';

import { VacuumBlogPageProps, getVacuumBlogStaticProps } from '@core/staticPages/vacuumBlog';
import { PageTypes } from '@core/constants/navigation';
import usePage from '@core/hooks/usePage';
import PageHeader from '@core/components/pages/PageHeader';

import { keywords } from '@lib/config/next-seo.config';

import VacuumBlog from '@components/blogs/vacuum';

const VacuumBlogPage: NextPage<VacuumBlogPageProps> = (props) => {
  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleAdd: keywords.vacuumMachine.main,
          descriptionAdd: keywords.vacuumMachine.main,
        }}
      />

      <VacuumBlog
        pageProps={props}
      />
    </>
  );
};

export default VacuumBlogPage;

export const getStaticProps = getVacuumBlogStaticProps;
