import { useIntl, FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
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
    //getProductPacks(product).length > 0 ? getProductPacks(product)[0] : undefined
  );
  const { Select: SelectQuantity, selectedQuantity } = useSelectInventoryQuantity(selectedInventory);

  const onClickAddCartBtn = () => {
    if (selectedInventory) {
      addCartItem(selectedInventory, selectedQuantity);
    }
  };

  const productH1 = () => {
    let formatted = false;
    let text = product.name.current;
    if (isEverfreshProduct(product)) { 
      formatted = true
      text = 'everfresh.h1';
    } else if (isBagsProduct(product)) {
      formatted = true
      text = 'bags.h1';
    }
    return (
      <Typography component="h1" variant="h1" sx={{ display: 'none' }}>
        { formatted ? 
            <FormattedMessage id={text} defaultMessage={text} />
            :
            <>{ text }</>
        }
      </Typography>
    );
  };

  const productTitle = () => {
    let text = product.name.current;
    if (selectedInventory) {
      text = selectedInventory.description.current;
    }
    return (
      <Typography component="h2" variant="h1">
        { text }
      </Typography>
    );
  };

  const productPrice = () => {
    let price = product.lowestRealPrice;
    if ((selectedInventory as ProductInventory)?.realPrice) {
      price = (selectedInventory as ProductInventory).realPrice;
    } else if ((selectedInventory as ProductPack)?.inventories) {
      price = (selectedInventory as ProductPack).price;
    }
    return (
      <Typography component="h2" variant="h1" sx={convertElementToSx(themeCustomElements.landing.priceContent.priceText)}>
        {`${price} €`} 
      </Typography>
    );
  };

  const productOriginalPrice = () => {
    let originPrice = product.lowestPrice;
    if ((selectedInventory as ProductInventory)?.realPrice) {
      originPrice = (selectedInventory as ProductInventory).price;
    } else if ((selectedInventory as ProductPack)?.inventories) {
      originPrice = (selectedInventory as ProductPack).originalPrice;
    }
    return (
      <Typography component="span" variant="body1">
        {(selectedInventory as ProductPack)?.inventories ? 
          `${intl.formatMessage({ id: 'productDetail.withoutPack' })}: `:
          `${intl.formatMessage({ id: 'productDetail.original' })}: `
        }<s>{`${originPrice}`}</s>{' €'}
      </Typography>
    );
  };

  const productDiscountPercent = () => {
    let percent = product.activeDiscount?.discountPercent || 0;
    if ((selectedInventory as ProductPack)?.inventories) {
      percent = (selectedInventory as ProductPack).discountPercent;
    }
    return (
      <Typography component="span" variant="body1" sx={convertElementToSx(themeCustomElements.landing.priceContent.discountText)}> 
        {` -${percent}%`}
      </Typography>
    );
  };

  const productDescription = () => {
    let formatted = false;
    let text = product.description.current;
    if (isEverfreshProduct(product)) { 
      formatted = true
      text = 'everfresh.description';
    } else if (isBagsProduct(product)) {
      formatted = true
      text = 'bags.description';
    }
    return (
      <Typography component="h3" variant="body1">
        { formatted ? 
            <FormattedMessage id={text} defaultMessage={text} />
            :
            <>{ text }</>
        }
      </Typography>
    );
  };

  const productComments = () => {
    if (isEverfreshProduct(product) || isBagsProduct(product)) {
      return (
        <>
          <Typography component="div" variant="body1" mb={4}>
            <FormattedMessage id={isEverfreshProduct(product) ? 'everfresh.comment' : 'bags.comment'} />
          </Typography>
          <LinkButton
            href={isEverfreshProduct(product) ? pages.bags.path : pages.everfresh.path}
            sx={convertElementToSx(themeCustomElements.button.action)}
          >
            <FormattedMessage
              id={isEverfreshProduct(product) ? 'everfresh.bagsButton' : 'bags.everfreshButton'}
            />
          </LinkButton>
        </>
      );
    }
    return (<></>);
  };

  const maxWidthCarousel = '540px';

  return (
    <Box 
      sx={{
        overflow: 'hidden',
      }}
    >
      { productH1() }

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
              <Box sx={{ mb: 3 }}>
                { productTitle() }
              </Box>
              { (product.activeDiscount || (selectedInventory as ProductPack)?.inventories) ?
                <Box sx={{ mb: 3 }}>
                  { productPrice() }
                  { productOriginalPrice() }
                  { productDiscountPercent() }
                </Box>
                :
                <Box sx={{ mb: 3 }}>
                  { productPrice() }
                </Box>
              }
              { productDescription() }
              {/* Cart inputs */}
              <Grid container mt={4} mb={2}>
                <Grid item>
                  <SelectInventory />
                </Grid>
                <Grid item mr={1} mb={2}>
                  <SelectQuantity />
                </Grid>
                <Grid
                  mb={2}
                  item 
                  container 
                  width="auto" 
                  direction="column" 
                  justifyContent="center"
                >
                  <Grid item>
                    <Button
                      
                      variant="contained"
                      onClick={onClickAddCartBtn}
                      disabled={!selectedInventory || selectedInventory.quantity == 0}
                      sx={convertElementToSx(themeCustomElements.button.action)}
                    >
                    
                      <FormattedMessage id="productDetail.addCartBtn" />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
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
    </Box>
  );
};

export default ProductDetail;
