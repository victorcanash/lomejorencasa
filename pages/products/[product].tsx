import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { composeProps } from "next-compose-props";

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { getProductPrice } from '@core/utils/products';
import { capitalizeFirstLetter } from '@core/utils/strings';
import { getPageProps, PageProps } from '@lib/server/page';
import usePage from '@lib/hooks/usePage';
import { ProductProps, getProductProps } from '@lib/server/product';
import useCart from '@lib/hooks/useCart';
import Carousel from '@components/Carousel';

const Product: NextPage<PageProps & ProductProps> = (props) => {
  const { token, user, categories, product } = props;

  const page = usePage({ token, user, categories });

  const router = useRouter();

  const { addCartItem } = useCart();

  return (
    <>
      <Head>
        <title>Search</title>
        <meta name="description" content="Product page" />
      </Head>

      <Container  
        sx={{
          p: 0,
          position: "relative",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between"
        }}
        className="test"
      >
        <Carousel product={product} />
        <Box>
          <Typography component="h1" variant="h4">
            {capitalizeFirstLetter(product.name)}
          </Typography>
          <Typography component="h2" variant="h6">
            {capitalizeFirstLetter(product.description)}
          </Typography>
          {
            product.discount ?
              <>
                <Typography component="h2" variant="h4" style={{ color: 'red' }}>
                  {getProductPrice(product)} €
                </Typography>
                <Typography component="h3" variant="h6" style={{ color: 'grey' }}>
                  Original: <s>{product.price} €</s> 
                  <span style={{ color: 'red' }}> -{product.discount.discountPercent}%</span> 
                </Typography> 
              </>
              :
              <Typography component="h2" variant="h4">
              `${getProductPrice(product)} €`
              </Typography>
          }
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add to cart
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default Product;

export const getServerSideProps = composeProps(getPageProps, getProductProps);
