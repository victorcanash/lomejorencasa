import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image'

import { composeProps } from "next-compose-props";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Container from '@mui/material/Container';

import Link from '@core/components/Link';
import { getProductImgUrl, getProductPrice } from '@core/utils/products';
import { capitalizeFirstLetter } from '@core/utils/strings';
import { getPageProps, PageProps } from '@lib/server/page';
import usePage from '@lib/hooks/usePage';
import { useSearchContext } from '@lib/contexts/SearchContext';
import useProductCategory from '@lib/hooks/useProductCategory';
import { CollectionProps, getCollectionProps } from '@lib/server/collection';

const Search: NextPage<PageProps & CollectionProps> = (props) => {
  const { token, user, categories, 
    products, currentPage, totalPages, categoryName, sortBy, order, keywords } = props;

  const page = usePage({ token, user, categories });

  const { getHref } = useSearchContext();

  const router = useRouter();

  const productCategory = useProductCategory(categoryName);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    router.push(getHref(categoryName, value));
  };

  return (
    <>
      <Head>
        <title>Search</title>
        <meta name="description" content="Search page" />
      </Head>

      <Typography component="h1" variant="h5">
        { capitalizeFirstLetter(categoryName) }
      </Typography>

      {
        productCategory &&
          <Typography component="h2" variant="h6">
            { capitalizeFirstLetter(productCategory.description) }
          </Typography>
      }

      <Container maxWidth="md" sx={{ p: 0 }}>
        <ImageList 
          gap={12}
          sx={{
            mt: 2,
            mb: 2,
            gridTemplateColumns:
              'repeat(auto-fill, minmax(120px, 1fr))!important',
          }}   
        >
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.name}?id=${product.id}`} underline="none" color="inherit">
              <ImageListItem sx={{ height: '100% !important' }}>

                <div>
                  <Image
                    src={getProductImgUrl(product)}
                    alt="Picture of the product"
                    width="500"
                    height="700"
                    layout="responsive"
                    objectFit="cover"
                    /*priority={product.id === 1 || 2 || 3 || 4 || 5 || 6}*/
                  />
                </div>

                <ImageListItemBar
                  title={
                    <div style={{fontSize: '13px'}}>
                      {product.name}
                    </div>
                  }
                  subtitle={
                    <div style={{ marginTop: '5px', fontSize: '13px' }}>
                      {
                        product.discount ?
                          <>
                            <div style={{ color: 'red' }}>{getProductPrice(product)} €</div>
                            <div style={{ marginTop: '5px', color: 'grey', fontSize: '10px' }}>
                              Original: <s>{product.price} €</s> 
                              <span style={{ color: 'red' }}> -{product.discount.discountPercent}%</span> 
                            </div> 
                          </>
                          :
                          <>
                            {getProductPrice(product)} €
                          </>

                      }
                    </div>
                  }
                  position="below"
                />

              </ImageListItem>
            </Link>
          ))}
        </ImageList>
      </Container>

      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChangePage}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </>
  );
};

export default Search;

export const getServerSideProps = composeProps(getPageProps, getCollectionProps);
