import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image'

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

import { getProductImgUrl, getProductPrice } from '@core/utils/products';
import { capitalizeFirstLetter } from '@core/utils/strings';
import usePage from '@lib/hooks/usePage';
import useProductCategory from '@lib/hooks/useProductCategory';
import { SearchProps, getSearchProps } from '@lib/props/search';

const Search: NextPage<SearchProps> = (props) => {
  const { products, currentPage, totalPages, categoryName, sortBy, order, keywords } = props;

  const page = usePage();

  const router = useRouter();

  const productCategory = useProductCategory(categoryName);

  const onClickProduct = (name: string) => {
    router.push(`/product/${name}`);
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    router.push({ 
      pathname: '/search', 
      query: { 
        page: value,
        sortBy: sortBy,
        order: order,
        keywords: keywords,
        category: categoryName
      }
    });
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

      <Container maxWidth="sm">
        <ImageList 
          sx={{ 
            mb: '3',
            gridTemplateColumns: 
              'repeat(auto-fill, minmax(140px, 1fr))!important' 
          }} 
          gap={6}
        >
          {products.map((product) => (
            <ImageListItem key={product.id} sx={{ height: '100% !important' }} onClick={() => onClickProduct(product.name)}>

              <div>
                <Image
                  src={getProductImgUrl(product)}
                  alt="Picture of the product"
                  width="800"
                  height="1000"
                  layout="responsive"
                  objectFit="cover"
                  /*priority={product.id === 1 || 2 || 3 || 4 || 5 || 6}*/
                />
              </div>

              <ImageListItemBar
                title={product.name}
                subtitle={
                  <div style={{ marginTop: '10px', fontSize: '15px' }}>
                    {
                      product.discount ?
                        <>
                          <div style={{ color: 'red' }}>{getProductPrice(product)} €</div>
                          <div style={{ marginTop: '5px', color: 'grey', fontSize: '13px' }}>
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

export const getServerSideProps = getSearchProps;
