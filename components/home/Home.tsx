import Box from '@mui/material/Box';

import ProductBanner from '@components/products/sections/ProductBanner';
import LandingList from '@components/products/collection/LandingList';
import BlogsList from '@components/blogs/BlogsList';
import ProductReviews from '@components/products/sections/ProductReviews';

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
