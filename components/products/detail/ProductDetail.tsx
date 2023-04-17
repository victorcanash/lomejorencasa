import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';

import { FormattedMessage, useIntl } from 'react-intl';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconDefinition,
  faCcVisa,
  faCcMastercard,
  faCcPaypal,
} from '@fortawesome/free-brands-svg-icons';
import {
  faTruck,
  faLock,
  faPhoneVolume,
  faArrowRightArrowLeft,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Masonry from '@mui/lab/Masonry';

import type { Product, ProductInventory, ProductPack } from '@core/types/products';
import type { FormatText } from '@core/types/texts';
import type { Source } from '@core/types/multimedia';
import { convertElementToSx } from '@core/utils/themes';
import { scrollToSection } from '@core/utils/navigation';
import Link from '@core/components/Link';
import CustomImage from '@core/components/CustomImage';

import colors from '@lib/constants/themes/colors';
import { themeCustomElements } from '@lib/constants/themes/elements';
import { useAppContext } from '@lib/contexts/AppContext';
import { useProductsContext } from '@lib/contexts/ProductsContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import useCart from '@lib/hooks/useCart';
import useSelectInventory from '@lib/hooks/useSelectInventory';
import useSelectInventoryQuantity from '@lib/hooks/useSelectInventoryQuantity';
import LoadingBtn from '@components/ui/LoadingBtn';
import LoadingRating from '@components/ui/LoadingRating';
import ProductCarousel from '@components/products/detail/ProductCarousel';
import EverfreshDetail from '@components/products/detail/EverfreshDetail';
import BagsDetail from '@components/products/detail/BagsDetail';

type ProductDetailProps = {
  product: Product,
};

const ProductDetail = (props: ProductDetailProps) => {
  const { product } = props;

  const router = useRouter();

  const { initialized } = useAppContext();
  const {
    everfreshProduct,
    bagsProduct,
    isEverfreshProduct,
    isBagsProduct,
    getProductPacks,
    getProductDetailImgsUrl,
    getProductImgUrl,
  } = useProductsContext();
  const { convertPriceToString } = useAuthContext();

  const intl = useIntl();

  const { addCartItem } = useCart(false);
  const { Select: SelectInventory, selectedInventory } = useSelectInventory(product);
  const { Select: SelectQuantity, selectedQuantity } = useSelectInventoryQuantity(selectedInventory);

  const [maxWidthSmall, _setMaxWidthSmall] = useState('540px');
  const [maxWidthMedium, _setMaxWidthMedium] = useState('623px');

  const onClickAddCartBtn = useCallback(() => {
    if (selectedInventory) {
      addCartItem(selectedInventory, selectedQuantity);
    }
  }, [addCartItem, selectedInventory, selectedQuantity]);

  const onClickAddCartPackBtn = useCallback(() => {
    const everfreshPack = getProductPacks(everfreshProduct).length > 0 ? getProductPacks(everfreshProduct)[0] : undefined;
    if (everfreshPack) {
      addCartItem(everfreshPack, 1);
    }
  }, [addCartItem, everfreshProduct, getProductPacks]);

  const productH1 = useCallback(() => {
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
  }, [isBagsProduct, isEverfreshProduct, product]);

  const productRating = useCallback(() => {
    if (!initialized || !selectedInventory) {
      return (
        <LoadingRating />
      );
    };
    const rating = parseInt(selectedInventory.rating);
    return (
      <Link
        href={router.pathname}
        scroll={false}
        onClick={() => scrollToSection('reviews')}
        sx={{ textDecoration: 'none' }}
      >
        <Grid container>
          <Grid item>
            <Rating
              value={rating}
              precision={0.5}
              readOnly
            />
          </Grid>
          <Grid item sx={{ ml: '6px' }}>
            <Typography component="span" variant="body1">
              {`(${selectedInventory.reviewsCount})`}
            </Typography>
          </Grid>
        </Grid>
      </Link>
    );
  }, [initialized, router.pathname, selectedInventory]);

  const productTitle = useCallback(() => {
    let text = product.name.current;
    if (selectedInventory) {
      text = selectedInventory.description.current;
    }
    return (
      <Typography component="h2" variant="h1" color="text.primary">
        { text }
      </Typography>
    );
  }, [product.name, selectedInventory]);

  const priceIcon = useCallback((icon: IconDefinition) => {
    return (
      <Grid item>
        <FontAwesomeIcon 
          size="2xl" 
          icon={icon}
        />
      </Grid>
    );
  }, []);

  const productPrice = useCallback(() => {
    let price = product.lowestRealPrice;
    let originPrice = product.lowestPrice;
    if ((selectedInventory as ProductInventory)?.realPrice) {
      price = (selectedInventory as ProductInventory).realPrice;
      originPrice = (selectedInventory as ProductInventory).price;
    } else if ((selectedInventory as ProductPack)?.inventories) {
      price = (selectedInventory as ProductPack).price;
      originPrice = (selectedInventory as ProductPack).originalPrice;
    }
    const discount = (product.activeDiscount || (selectedInventory as ProductPack)?.inventories) ? true : false;
    return (
      <Grid container spacing={2}>
        <Grid item>
          <Typography component="h2" variant="h2" sx={convertElementToSx(themeCustomElements.landing.priceContent.priceText)}>
            { discount ?
              <>
                <span
                  style={{ fontWeight: 500, textDecoration: 'line-through' }}
                >
                  <span style={{ color: colors.text.disabled }}>
                    {`${convertPriceToString(originPrice)}`}
                  </span>
                </span>
                {` ${convertPriceToString(price)}`}
              </>
              :
              <>
                {`${convertPriceToString(price)}`}
              </>
            }
          </Typography>
        </Grid>
        <Grid item sx={{ mt: '3px' }}>
          <Typography variant="body2">
            <FormattedMessage id="productDetail.price.iva" />
          </Typography>
        </Grid>
        { priceIcon(faCcVisa) }
        { priceIcon(faCcMastercard) }
        { priceIcon(faCcPaypal) }
      </Grid>
    );
  }, [convertPriceToString, priceIcon, product.activeDiscount, product.lowestPrice, product.lowestRealPrice, selectedInventory]);

  const everfreshPackPrice = useCallback(() => {
    const everfreshPack = getProductPacks(everfreshProduct).length > 0 ? getProductPacks(everfreshProduct)[0] : undefined;
    if (!everfreshPack) {
      return (<></>);
    }
    const price = everfreshPack.price;
    const originPrice = everfreshPack.originalPrice;
    const percent = everfreshPack.discountPercent;
    return (
      <Grid container columnSpacing={2} rowSpacing={1}>
        <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography component="h2" variant="h2" sx={convertElementToSx(themeCustomElements.landing.priceContent.priceText)}>
            <span
              style={{ color: colors.text.black }}
            >
              {`${intl.formatMessage({ id: 'productDetail.pack.price' })}: `}
            </span>
            <span
              style={{ fontWeight: 500, textDecoration: 'line-through' }}
            >
              <span style={{ color: colors.text.disabled }}>
                {`${convertPriceToString(originPrice)}`}
              </span>
            </span>
            {` ${convertPriceToString(price)}`}
          </Typography>
        </Grid>
        <Grid item>
          <Typography component="div" variant="body1Head" sx={convertElementToSx(themeCustomElements.landing.priceContent.percentText)}>
            <FormattedMessage id="productDetail.pack.percent" values={{ value: percent }} />
          </Typography>
        </Grid>
      </Grid>
    );
  }, [intl, convertPriceToString, everfreshProduct, getProductPacks]);

  /*const productDescription = useCallback(() => {
    let formatted = false;
    let text = product.description.current;
    if (isEverfreshProduct(product)) { 
      formatted = true;
      text = 'everfresh.description';
    } else if (isBagsProduct(product)) {
      formatted = true;
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
  }, [isBagsProduct, isEverfreshProduct, product]);*/

  const landingIcon = useCallback((icon: IconDefinition, text: FormatText, columnSpacing: number) => {
    return (
      <Grid item xs={12} container columnSpacing={columnSpacing}>
        <Grid item>
          <FontAwesomeIcon 
            size="2xl" 
            icon={icon}
          />
        </Grid>
        <Grid item>
          <Typography variant="body1Head">
            <FormattedMessage id={text.id} defaultMessage={text.id} values={text.values} />
          </Typography>
        </Grid>
      </Grid>
    );
  }, []);

  const productComments = useCallback(() => {
    if (isEverfreshProduct(product) || isBagsProduct(product)) {
      return (
        <Typography component="div" variant="body1">
          <FormattedMessage id={isEverfreshProduct(product) ? 'everfresh.comment' : 'bags.comment'} />
        </Typography>
      );
    }
    return (<></>);
  }, [isBagsProduct, isEverfreshProduct, product]);

  return (
    <Box>
      { productH1() }
      <Container>
        {/* General Product Section */}
        <Masonry columns={{ xs: 1, md: 2 }} spacing={0}>
          {/* Images */}
          <Box>
            <Box
              sx={{
                maxHeight: '599.13px',
                maxWidth: {
                  xs: maxWidthSmall,
                  md: maxWidthMedium,
                },
                m: 'auto',
              }}
            >
              <ProductCarousel
                sources={
                  getProductDetailImgsUrl(product).map((item) => {
                    return {
                      src: item,
                      alt: isEverfreshProduct(product) ? 'Envasadora al Vacío Everfresh' : 'Bolsas de Vacío',
                      priority: true,
                    } as Source;
                  })
                }
              />
            </Box>
          </Box>

          {/* Content */}
          <Box>
            <Box
              sx={{
                maxWidth: {
                  xs: maxWidthSmall,
                  md: 'max-content',
                },
                m: 'auto',
                ml: {
                  xs: 'auto',
                  md: 4,
                  md_lg: 5,
                  lg: 6,
                }
              }}  
            >
              <Box>
                { productRating() }
              </Box>
              <Box sx={{ mb: 2 }}>
                { productTitle() }
              </Box>
              <Box sx={{ mb: 2 }}>
                { productPrice() }
              </Box>
              {/* Icons */}
              <Grid container spacing={2} mb={3}>
                { landingIcon(faTruck, { id: 'productDetail.icons.shipping' }, 2) }
                { landingIcon(faLock, { id: 'productDetail.icons.payment' }, 3) }
                { landingIcon(faPhoneVolume, { id: 'productDetail.icons.support' }, 2.5) }
                { landingIcon(faArrowRightArrowLeft, { id: 'productDetail.icons.guarantee' }, 3) }
              </Grid>
              {/* Cart inputs */}
              <Grid container>
                { !isEverfreshProduct(product) &&
                  <Grid item>
                    <SelectInventory />
                  </Grid>
                }
                <Grid item mb={2}>
                  <SelectQuantity label={isEverfreshProduct(product) ? true : false} />
                </Grid>
              </Grid>
              { initialized && selectedInventory ?
                <Button
                  fullWidth
                  variant="contained"
                  onClick={onClickAddCartBtn}
                  disabled={selectedInventory.quantity == 0}
                  sx={{
                    ...convertElementToSx(themeCustomElements.button.action.primary),
                    mb: 3,
                  }}
                >
                  <FormattedMessage id="productDetail.addCartBtn" />
                </Button>
                :
                <LoadingBtn
                  fullWidth
                  variant="contained"
                  sx={{
                    ...convertElementToSx(themeCustomElements.button.action.primary),
                    mb: 3,
                  }}
                >
                  <FormattedMessage id="productDetail.addCartBtn" />
                </LoadingBtn>
              }
              <Box>
                { productComments() }
              </Box>
            </Box>
          </Box>

          {/* Everfresh Pack */}
          <Box>
            <Box
              sx={{
                maxWidth: {
                  xs: maxWidthSmall,
                  md: maxWidthMedium,
                },
                m: 'auto',
                pt: 3,
              }}  
            >
              <Typography variant="h3" color="text.primary" sx={{...convertElementToSx(themeCustomElements.landing.quantityLabel), textAlign: 'center'}}>
                <FormattedMessage id="productDetail.pack.title" />
              </Typography>
              <Grid container mt={2} justifyContent="center" alignItems="center" columnSpacing={1}>
                <Grid item xs={5.5}>
                  <CustomImage
                    src={getProductImgUrl(everfreshProduct)}
                    alt="Máquina de Vacío"
                    width="1080"
                    height="1080"
                    layout="responsive"
                    objectFit="cover"
                    style={{ borderRadius: '10px' }}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Box>
                    <FontAwesomeIcon
                      size="2xl"
                      icon={faPlus}
                      style={{ margin: 'auto', display: 'block' }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={5.5}>
                  <CustomImage
                    src={getProductImgUrl(bagsProduct)}
                    alt="Bolsas de Vacío con Válvula"
                    width="1080"
                    height="1080"
                    layout="responsive"
                    objectFit="cover"
                    style={{ borderRadius: '10px' }}
                  />
                </Grid>
                <Grid item xs={12} mt={2}>
                  { everfreshPackPrice() }
                </Grid>
                <Grid item xs={12} mt={2}>
                  { initialized ?
                    <Button
                      variant="contained"
                      onClick={onClickAddCartPackBtn}
                      sx={{
                        ...convertElementToSx(themeCustomElements.button.action.primary),
                        py: 1,
                        mb: 3,
                      }}
                    >
                      <FormattedMessage id="productDetail.addCartPackBtn" />
                    </Button>
                  :
                    <LoadingBtn
                      variant="contained"
                      sx={{
                        ...convertElementToSx(themeCustomElements.button.action.primary),
                        py: 1,
                        mb: 3,
                      }}
                    >
                      <FormattedMessage id="productDetail.addCartPackBtn" />
                    </LoadingBtn>
                  }
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Masonry>
      </Container>

      {/* Type Product Section */}
      { (isEverfreshProduct(product) || isBagsProduct(product)) &&
        <Box>
          { isEverfreshProduct(product) &&
            <EverfreshDetail />
          }
          { isBagsProduct(product) &&
            <BagsDetail />
          }
        </Box>
      }
    </Box>
  );
};

export default ProductDetail;
