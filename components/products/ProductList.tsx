import { useRouter } from 'next/router';

import { FormattedMessage } from 'react-intl';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { allProductsName } from '@core/constants/products';
import type { Product, ProductCategory } from '@core/types/products';
import { capitalizeFirstLetter } from '@core/utils/strings';
import { useSearchContext } from '@lib/contexts/SearchContext';
import ProductItem from '@components/products/ProductItem';
import Pagination from '@components/ui/Pagination';

type ProductListProps = {
  category: ProductCategory | null,
  products: Product[],
  totalPages: number,
  currentPage: number,
  keywords: string,
};

const ProductList = (props: ProductListProps) => {
  const { category, products, totalPages, currentPage, keywords } = props;

  const { getHref } = useSearchContext();

  const router = useRouter();

  const handleChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    router.push(getHref(category?.name.current || allProductsName, page, keywords));
  };

  return (
    <>
      <Typography component="h1" variant="h1" className='animate__animated animate__fadeInLeft'>
        { category?.name ?
          capitalizeFirstLetter(category.name.current) 
          :
          <FormattedMessage
            id="productList.allCategories"
            defaultMessage={allProductsName}
          />
        } 
      </Typography>

      {
        category &&
          <Typography component="h2" variant="body1" className='animate__animated animate__fadeInLeft'>
            { capitalizeFirstLetter(category.description.current) }
          </Typography>
      }
      <Divider sx={{ my: 3 }} />

      {
        products.length > 0 ?
          <Grid container spacing={1} py={3}>
            {products?.map((item) => (
              <Grid item xs={6} sm={4} lg={3} key={item.id}>
                <ProductItem product={item} />
              </Grid>
            ))}
          </Grid>
          :
          <Typography component="h3" variant="body1" sx={{ textAlign: "center" }}>
            <FormattedMessage
              id="productList.noItems"
            />
          </Typography>
      }

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onChangePage={handleChangePage}
      />
    </>
  );
};

export default ProductList;
