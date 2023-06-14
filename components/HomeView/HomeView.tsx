import Box from '@mui/material/Box';

import ProductBanner from '@core/components/banners/ProductBanner';
import CategoryList from '@core/components/CategoryList';
import LandingList from '@core/components/LandingList';
import BlogsList from '@core/components/BlogsList';
import ProductReviews from '@core/components/ProductReviews';

const HomeView = () => {

  return (
    <Box>
      <ProductBanner />
      <CategoryList
        type="stack"
      />
      <LandingList
        type="stack"
        title={{
          id: 'productList.featured.title',
        }}
      />
      <BlogsList />
      <ProductReviews />
    </Box>
  );
};

export default HomeView;
