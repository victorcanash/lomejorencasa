import { useRouter } from 'next/router';

import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';

import { allProductsName } from '@core/constants/products';
import type { Product, ProductCategory } from '@core/types/products';
import { convertElementToSx } from '@core/utils/themes';
import { capitalizeFirstLetter } from '@core/utils/strings';
import Link from '@core/components/navigation/Link';
import CustomImage from '@core/components/multimedia/CustomImage';

import { pages } from '@lib/config/navigation.config';
import { themeCustomElements } from '@lib/constants/themes/elements';
import { useSearchContext } from '@lib/contexts/SearchContext';
import { useProductsContext } from '@lib/contexts/ProductsContext';
import Pagination from '@core/components/ui/Pagination';

type ProductListProps = {
  category: ProductCategory | null,
  products: Product[],
  totalPages: number,
  currentPage: number,
  keywords: string,
};

const ProductList = (props: ProductListProps) => {
  /*const { category, products, totalPages, currentPage, keywords } = props;

  const { getHref } = useSearchContext();
  const { getProductImgUrl } = useProductsContext();

  const router = useRouter();

  const handleChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    router.push(getHref(category?.name.current || allProductsName, page, keywords));
  };

  return (
    <Container>
      { category &&
        <Typography component="h2" variant="body1">
          { capitalizeFirstLetter(category.description.current) }
        </Typography>
      }

      { products.length > 0 ?
        <Grid container spacing={1} py={3}>
          {products?.map((item, index) => (
            <Grid
              key={index}
              item
              xs={6}
              sm={4}
              lg={3}
            >
              <Card>
                <CardActionArea component={Link} href={`${pages.productDetail.path}/${item.name.current}?id=${item.id}`} noLinkStyle>
      
                  <CardMedia>
                    <div>
                      <CustomImage
                        src={getProductImgUrl(item)}
                        width="1080"
                        height="1080"
                        layout="responsive" 
                        objectFit="cover"
                        priority
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
                          <Typography component="div" variant="body1" sx={convertElementToSx(themeCustomElements.landing.priceContent.priceText)}>
                            {`${item.lowestRealPrice} €`}
                          </Typography>
                          <Typography component="span" variant="body2">
                            <FormattedMessage id="productDetail.original" />: <s>{`${item.lowestPrice} €`}</s>
                          </Typography> 
                          <Typography component="span" variant="body2" sx={convertElementToSx(themeCustomElements.landing.priceContent.discountText)}>
                            {` -${item.activeDiscount.discountPercent}%`}
                          </Typography> 
                        </>
                        :
                        <Typography component="span" variant="body1" sx={convertElementToSx(themeCustomElements.landing.priceContent.priceText)}>
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
    </Container>
  );*/
  return (<></>);
};

export default ProductList;
