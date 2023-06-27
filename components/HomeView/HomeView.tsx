import Box from '@mui/material/Box';

import { HomePageProps } from '@core/staticPages/home';
import AllProductsBanner from '@core/components/banners/productBanners/AllProductsBanner';
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
      <AllProductsBanner />
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
