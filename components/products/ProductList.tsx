import { useRouter } from 'next/router';
import Image from 'next/image'

import { FormattedMessage } from 'react-intl';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';

import { allProductsName } from '@core/constants/products';
import type { Product, ProductCategory } from '@core/types/products';
import { capitalizeFirstLetter } from '@core/utils/strings';
import Link from '@core/components/Link';

import { pages } from '@lib/constants/navigation';
import { getProductImgUrl } from '@lib/utils/products';
import { useSearchContext } from '@lib/contexts/SearchContext';
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

      { products.length > 0 ?
        <Grid container spacing={1} py={3}>
          {products?.map((item) => (
            <Grid item xs={6} sm={4} lg={3} key={item.id}>
              <Card className='animate__animated animate__fadeIn' raised>
                <CardActionArea component={Link} href={`${pages.productDetail.path}/${item.name.current}?id=${item.id}`} noLinkStyle>
      
                  <CardMedia>
                    <div>
                      <Image
                        src={getProductImgUrl(item)}
                        alt="Product image"
                        width="500"
                        height="500"
                        layout="responsive"
                        objectFit="cover"
                      />
                    </div>
                  </CardMedia>
                  
                  <CardContent>
                    <Box>
                      <Typography component="div" variant="body1">
                        {capitalizeFirstLetter(item.name.current)}
                      </Typography>
                      
                      { item.activeDiscount ?
                        <>
                          <Typography component="div" variant="body1" color="error">
                            {`${item.lowestRealPrice} €`}
                          </Typography>
                          <Typography component="span" variant="body2">
                            <FormattedMessage id="productDetail.original" />: <s>{`${item.lowestPrice} €`}</s>
                          </Typography> 
                          <Typography component="span" variant="body2" color="error">
                            {` -${item.activeDiscount.discountPercent}%`}
                          </Typography> 
                        </>
                        :
                        <Typography component="span" variant="body1">
                          {`${item.lowestRealPrice} €`}
                        </Typography>
                      }
                    </Box>
                  </CardContent>

                </CardActionArea>
              </Card>
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
