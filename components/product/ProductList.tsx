import { useRouter } from 'next/router';

import Grid from "@mui/material/Grid";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { Product, ProductCategory } from "@core/types/products";
import { allProductsName } from "@core/constants/products";
import { capitalizeFirstLetter } from '@core/utils/strings';
import { useSearchContext } from '@lib/contexts/SearchContext';
import ProductItem from '@components/product/ProductItem';

type ProductListProps = {
  category: ProductCategory | null,
  products: Product[],
  totalPages: number,
  currentPage: number,
};

const ProductList = (props: ProductListProps) => {
  const { category, products, totalPages, currentPage } = props;

  const { getHref } = useSearchContext();

  const router = useRouter();

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    router.push(getHref(category?.name || allProductsName, value));
  };

  return (
    <>
      <Typography component="h1" variant="h5" className='animate__animated animate__fadeInLeft'>
        { capitalizeFirstLetter(category?.name || allProductsName) }
      </Typography>

      {
        category &&
          <Typography component="h2" variant="h6" className='animate__animated animate__fadeInLeft'>
            { capitalizeFirstLetter(category.description) }
          </Typography>
      }
      <Divider sx={{ my: 3 }} />

      <Grid container spacing={1} py={3}>
        {products?.map((item) => (
          <Grid item xs={6} sm={4} lg={3} key={item.id}>
            <ProductItem product={item} />
          </Grid>
        ))}
      </Grid>

      <Stack spacing={2} sx={{ mt: 1 }} >
        <Pagination
          sx={{
            display: "flex", flexDirection: "col", justifyContent: "center"
          }}
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

export default ProductList;
