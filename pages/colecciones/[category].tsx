import type { NextPage } from 'next';

import {
  CategoryPageProps,
  getCategoryStaticPaths,
  getCategoryStaticProps,
} from '@core/staticPages/category';
import { PageTypes } from '@core/constants/navigation';
import usePage from '@core/hooks/usePage';
import PageHeader from '@core/components/pages/PageHeader';
import LandingList from '@core/components/LandingList';

const CategoryPage: NextPage<CategoryPageProps> = (props) => {
  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleAdd: props.category.name.current,
          descriptionAdd: props.category.description.current,
        }}
        marginTop={true}
      />

      <LandingList
        type="collectionsPage"
        category={props.category}
        landings={props.landings}
      />
    </>
  );
};

export default CategoryPage;

export const getStaticPaths = getCategoryStaticPaths;

export const getStaticProps = getCategoryStaticProps;
