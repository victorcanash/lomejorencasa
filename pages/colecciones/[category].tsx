import type { NextPage } from 'next';

import {
  CategoryPageProps,
  getCategoryStaticPaths,
  getCategoryStaticProps,
} from '@core/staticPages/category';
import { PageTypes } from '@core/constants/navigation';
import usePage from '@core/hooks/usePage';
import useCategoryPage from '@core/hooks/useCategoryPage';
import PageHeader from '@core/components/pages/PageHeader';
import LandingList from '@core/components/LandingList';

const CategoryPage: NextPage<CategoryPageProps> = (props) => {
  const { path } = props;

  const page = usePage();
  const { categoryModel, categoryConfig } = useCategoryPage(path);

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleAdd: categoryConfig?.metas.title || path,
          descriptionAdd: categoryConfig?.metas.title || path,
        }}
        marginTop={true}
      />

      { (categoryModel && categoryConfig) &&
        <LandingList
          type="collectionsPage"
          categoryModel={categoryModel}
          categoryConfig={categoryConfig}
        />
      }
    </>
  );
};

export default CategoryPage;

export const getStaticPaths = getCategoryStaticPaths;

export const getStaticProps = getCategoryStaticProps;
