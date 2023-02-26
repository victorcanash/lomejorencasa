import { Fragment } from 'react';

import { useIntl, FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import type { Product } from '@core/types/products';
import type { Source } from '@core/types/multimedia';
import { convertElementToSx } from '@core/utils/themes';
import LinkButton from '@core/components/LinkButton';

import { pages } from '@lib/constants/navigation';
import { themeCustomElements } from '@lib/constants/themes/elements';
import { everfreshProductId, bagsProductId } from '@lib/constants/products';
import { getProductDetailImgsUrl } from '@lib/utils/products';
import useCart from '@lib/hooks/useCart';
import useSelectInventory from '@lib/hooks/useSelectInventory';
import useSelectInventoryQuantity from '@lib/hooks/useSelectInventoryQuantity';
import ProductCarousel from '@components/products/detail/ProductCarousel';
import EverfreshDetail from '@components/products/detail/EverfreshDetail';
import BagsDetail from '@components/products/detail/BagsDetail';

type ProductDetailProps = {
  product: Product,
};

const ProductDetail = (props: ProductDetailProps) => {
  const { product } = props;

  const intl = useIntl();

  const { addCartItem } = useCart();
  const { Select: SelectInventory, selectedInventory } = useSelectInventory(product);
  const { Select: SelectQuantity, selectedQuantity } = useSelectInventoryQuantity(selectedInventory);

  const onClickAddCartBtn = () => {
    if (selectedInventory) {
      addCartItem(selectedInventory, selectedQuantity);
    }
  };

  const everfreshProduct = () => {
    return everfreshProductId === product.id;
  };
  const bagsProduct = () => {
    return bagsProductId === product.id;
  };

  const productTitleId = () => {
    if (everfreshProduct()) { 
      return 'everfresh.h1';
    } else if (bagsProduct()) {
      return 'bags.h1';
    }
    return `${product.name.current}`;
  };

  const productDescriptionId = () => {
    if (everfreshProduct()) {
      return 'everfresh.description';
    } else if (bagsProduct()) {
      return 'bags.description';
    }
    return `${product.description.current}`;
  };

  const productComments = () => {
    if (everfreshProduct()) {
      return (
        <>
          <Typography component="div" variant="body1" sx={{ mb: 2 }}>
            <FormattedMessage id="everfresh.comment" />
          </Typography>
          <LinkButton href={pages.bags.path}>
            <FormattedMessage 
              id="everfresh.bagsButton" 
            />
          </LinkButton>
        </>
      );
    } else if (bagsProduct()) {
      return (
        <>
          <Box mb={2}>
            <Typography component="div" variant="body1" sx={{ mb: 1 }}>
              <FormattedMessage id="bags.types.title" />
            </Typography>
            { [1,2,3,4,5,6].map((_item, index) => (
              <Fragment key={index}>
                <Typography component="div" variant="body1" sx={{ mb: 1, marginInlineStart: '15px' }}>
                  <Box sx={{ display: 'inline-block' }}>
                    {`${intl.formatMessage({ id: `bags.types.${index + 1}.title` })}:`}
                  </Box>
                  {` ${intl.formatMessage({ id: `bags.types.${index + 1}.content` })}`}
                </Typography>
              </Fragment>
            ))}
          </Box>
          <LinkButton href={pages.everfresh.path}>
            <FormattedMessage
              id="bags.everfreshButton" 
            />
          </LinkButton>
        </>
      );
    }
    return (<></>);
  };

  const maxWidthCarousel = '540px';

  return (
    <>
      <Container>

        {/* General Product Section */}
        <Grid 
          container 
          spacing={3}
        >

          {/* Images */}
          <Grid
            item
            xs={12}
            md={6}
          >
            <Box
              sx={{
                maxWidth: maxWidthCarousel, 
                m: 'auto',
              }}  
            >
              <ProductCarousel 
                sources={getProductDetailImgsUrl(product).map((item) => { 
                  return { src: item } as Source;
                })}
              />
            </Box>
          </Grid>

          {/* Content */}
          <Grid 
            item 
            xs={12}
            md={6}
          >
            <Box
              sx={{
                maxWidth: maxWidthCarousel, 
                m: 'auto',
              }}  
            >
              {/* Title */}
              <Typography component="h1" variant="h1" sx={{ mb: 2 }}>
                <FormattedMessage id={productTitleId()} />
              </Typography>
              {/* Price */}  
              { product.activeDiscount ?
                <Box sx={{ mb: 2 }}>
                  <Typography component="h2" variant="h3" sx={convertElementToSx(themeCustomElements.landing.priceContent.priceText)}>
                    {selectedInventory ? selectedInventory.realPrice : product.lowestRealPrice} €
                  </Typography>
                  <Typography component="span" variant="body1">
                    <FormattedMessage id="productDetail.original" />: <s>{selectedInventory ? selectedInventory.price : product.lowestPrice} €</s>
                  </Typography> 
                  <Typography component="span" variant="body1" sx={convertElementToSx(themeCustomElements.landing.priceContent.discountText)}> 
                    {` -${product.activeDiscount.discountPercent}%`}
                  </Typography> 
                </Box>
                :
                <Box sx={{ mb: 2 }}>
                  <Typography component="h2" variant="h3" sx={convertElementToSx(themeCustomElements.landing.priceContent.priceText)}>
                    {selectedInventory ? selectedInventory.realPrice : product.lowestRealPrice} €
                  </Typography>
                </Box>
              }
              {/* Description */}
              <Typography component="h3" variant="body1" sx={{ mb: 2 }}>
                <FormattedMessage id={productDescriptionId()} />
              </Typography>
              {/* Cart inputs */}
              <FormControl 
                sx={{ mb: 2 }} 
              >
                <SelectInventory />
                <Button
                  fullWidth
                  variant="contained"
                  onClick={onClickAddCartBtn}
                  disabled={!selectedInventory || selectedInventory.quantity == 0}
                  sx={{
                    ...convertElementToSx(themeCustomElements.button.action),
                    mt: 1,
                  }}
                >
                  <FormattedMessage id="productDetail.addCartBtn" />
                </Button>
              </FormControl>
              <FormControl 
                sx={{ mb: 2 }} 
              >
                <SelectQuantity />
              </FormControl>
              {/* Comments */}
              { productComments() }
            </Box>
          </Grid>

        </Grid>
        
      </Container>

      {/* Type Product Section */}
      { (everfreshProduct() || bagsProduct()) &&
        <>
          { everfreshProduct() &&
            <EverfreshDetail />      
          }

          { bagsProduct() &&
            <BagsDetail />
          }
        </>
      }
    </>
  );
};

export default ProductDetail;
