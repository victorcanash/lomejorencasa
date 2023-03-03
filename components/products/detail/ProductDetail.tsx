import { useState } from 'react';

import { useIntl, FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import type { Product, ProductInventory, ProductPack } from '@core/types/products';
import type { Source } from '@core/types/multimedia';
import { convertElementToSx } from '@core/utils/themes';
import LinkButton from '@core/components/LinkButton';

import { pages } from '@lib/constants/navigation';
import { themeCustomElements } from '@lib/constants/themes/elements';
import { useProductsContext } from '@lib/contexts/ProductsContext';
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

  const { 
    isEverfreshProduct, 
    isBagsProduct, 
    getProductPacks, 
    getProductDetailImgsUrl,
  } = useProductsContext();

  const intl = useIntl();

  const { addCartItem } = useCart();
  const { 
    Select: SelectInventory,
    selectedInventory,
  } = useSelectInventory(
    product, 
    getProductPacks(product).length > 0 ? getProductPacks(product)[0] : undefined
  );
  const { Select: SelectQuantity, selectedQuantity } = useSelectInventoryQuantity(selectedInventory);

  const [_packs, _setPacks] = useState<ProductPack[]>(getProductPacks(product))

  const onClickAddCartBtn = () => {
    if (selectedInventory) {
      addCartItem(selectedInventory, selectedQuantity);
    }
  };

  const productTitleId = () => {
    if (isEverfreshProduct(product)) { 
      return 'everfresh.h1';
    } else if (isBagsProduct(product)) {
      return 'bags.h1';
    }
    return `${product.name.current}`;
  };

  const productPrice = () => {
    if ((selectedInventory as ProductInventory)?.realPrice) {
      return (selectedInventory as ProductInventory).realPrice;
    } else if ((selectedInventory as ProductPack)?.inventories) {
      return (selectedInventory as ProductPack).price;
    }
    return product.lowestRealPrice;
  };

  const productOriginalPrice = () => {
    if ((selectedInventory as ProductInventory)?.realPrice) {
      return (selectedInventory as ProductInventory).price;
    } else if ((selectedInventory as ProductPack)?.inventories) {
      return (selectedInventory as ProductPack).originalPrice;
    }
    return product.lowestPrice;
  };

  const productDiscountPercent = () => {
    if ((selectedInventory as ProductInventory)?.realPrice) {
      return product.activeDiscount?.discountPercent;
    } else if ((selectedInventory as ProductPack)?.inventories) {
      return (selectedInventory as ProductPack).discountPercent;
    }
    return product.activeDiscount?.discountPercent;
  };

  const productDescriptionId = () => {
    if (isEverfreshProduct(product)) { 
      return 'everfresh.description';
    } else if (isBagsProduct(product)) {
      return 'bags.description';
    }
    return `${product.description.current}`;
  };

  const productComments = () => {
    if (isEverfreshProduct(product)) {
      return (
        <>
          <Typography component="div" variant="body1" mb={4}>
            <FormattedMessage id="everfresh.comment" />
          </Typography>
          <LinkButton 
            href={pages.bags.path}
            sx={convertElementToSx(themeCustomElements.button.action)}
          >
            <FormattedMessage 
              id="everfresh.bagsButton" 
            />
          </LinkButton>
        </>
      );
    } else if (isBagsProduct(product)) {
      return (
        <>
          <LinkButton 
            href={pages.everfresh.path}
            sx={convertElementToSx(themeCustomElements.button.action)}
          >
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
              <Typography component="h1" variant="h1" sx={{ mb: 3 }}>
                <FormattedMessage id={productTitleId()} />
              </Typography>
              {/* Price */}  
              { (product.activeDiscount || (selectedInventory as ProductPack)?.inventories) ?
                <Box sx={{ mb: 3 }}>
                  <Typography component="h2" variant="h3" sx={convertElementToSx(themeCustomElements.landing.priceContent.priceText)}>
                    {`${productPrice()} €`} 
                  </Typography>
                  <Typography component="span" variant="body1">
                    {`${intl.formatMessage({ id: 'productDetail.original' })}:`}
                    <s>{` ${productOriginalPrice()} €`}</s>
                  </Typography>
                  <Typography component="span" variant="body1" sx={convertElementToSx(themeCustomElements.landing.priceContent.discountText)}> 
                    {` -${productDiscountPercent()}%`}
                  </Typography>
                </Box>
                :
                <Box sx={{ mb: 3 }}>
                  <Typography component="h2" variant="h3" sx={convertElementToSx(themeCustomElements.landing.priceContent.priceText)}>
                    {`${productPrice()} €`} 
                  </Typography>
                </Box>
              }
              {/* Description */}
              <Typography component="h3" variant="body1" sx={{ mb: 4 }}>
                <FormattedMessage id={productDescriptionId()} />
              </Typography>
              {/* Cart inputs */}
              <FormControl 
                sx={{ mb: 4 }} 
              >
                <SelectInventory />
                <Button
                  fullWidth
                  variant="contained"
                  onClick={onClickAddCartBtn}
                  disabled={!selectedInventory || selectedInventory.quantity == 0}
                  sx={{
                    ...convertElementToSx(themeCustomElements.button.action),
                    mt: 2,
                  }}
                >
                  <FormattedMessage id="productDetail.addCartBtn" />
                </Button>
              </FormControl>
              <FormControl 
                sx={{ mb: 4 }} 
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
      { (isEverfreshProduct(product) || isBagsProduct(product)) &&
        <>
          { isEverfreshProduct(product) &&
            <EverfreshDetail />      
          }
          { isBagsProduct(product) &&
            <BagsDetail />
          }
        </>
      }
    </>
  );
};

export default ProductDetail;
