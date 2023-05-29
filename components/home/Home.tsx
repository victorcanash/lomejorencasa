import Box from '@mui/material/Box';

import ProductBanner from '@core/components/banners/ProductBanner';
import LandingList from '@core/components/LandingList/LandingList';
import BlogsList from '@core/components/BlogsList';
import ProductReviews from '@components/products/reviews';

const Home = () => {

  return (
    <Box 
      sx={{
        overflow: 'hidden',
      }}
    >
      <ProductBanner />
      <LandingList />
      <BlogsList />
      <ProductReviews />
    </Box>
  );
};

export default Home;
