import Box from '@mui/material/Box';

import { HomePageProps } from '@core/staticPages/home';
import ProductBanner from '@core/components/banners/ProductBanner';
import CategoryList from '@core/components/CategoryList';
import LandingList from '@core/components/LandingList';
import BlogsList from '@core/components/BlogsList';
import ProductReviews from '@core/components/ProductReviews';

type HomeViewProps = {
  pageProps: HomePageProps,
}
const HomeView = (props: HomeViewProps) => {
  const { pageProps } = props;

  return (
    <Box>
      <ProductBanner />
      <CategoryList
        type="stack"
        categories={pageProps.categoryGroups}
      />
      { pageProps.categoryFeatured &&
        <LandingList
          type="stack"
          category={pageProps.categoryFeatured}
          landings={pageProps.landingsFeatured}
        />
      }
      <BlogsList />
      <ProductReviews />
    </Box>
  );
};

export default HomeView;
