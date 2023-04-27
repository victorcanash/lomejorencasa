import { useState, useMemo, useCallback, ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/router';

import { FormattedMessage, useIntl } from 'react-intl';
import NP from 'number-precision'
import { useInView } from 'react-intersection-observer';

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
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Masonry from '@mui/lab/Masonry';

import type { Product, ProductInventory, ProductPack } from '@core/types/products';
import type { FormatText } from '@core/types/texts';
import type { Source } from '@core/types/multimedia';
import { convertElementToSx } from '@core/utils/themes';
import { scrollToSection } from '@core/utils/navigation';
import Link from '@core/components/Link';
import CustomImage from '@core/components/CustomImage';

import { keywords } from '@lib/config/next-seo.config';
import { pages } from '@lib/constants/navigation';
import colors from '@lib/constants/themes/colors';
import { themeCustomElements } from '@lib/constants/themes/elements';
import { bagsMIXImgId, everfreshImgId } from '@lib/constants/multimedia';
import { useAppContext } from '@lib/contexts/AppContext';
import { useProductsContext } from '@lib/contexts/ProductsContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import useCart from '@lib/hooks/useCart';
import LoadingBtn from '@components/ui/LoadingBtn';
import LoadingRating from '@components/ui/LoadingRating';
import ProductCarousel from '@components/products/detail/ProductCarousel';
import SelectInventory from '@components/products/inputs/SelectInventory'
import SelectInventoryQuantity from '@components/products/inputs/SelectInventoryQuantity'
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
    getProductInventories,
    getProductPacks,
    getBagsPack,
    getProductDetailImgsUrl,
    getProductPageUrl,
  } = useProductsContext();
  const { convertPriceToString } = useAuthContext();

  const intl = useIntl();

  const { addCartItem } = useCart(false);
  const { ref: payNowBtnRef, inView: payNowInView } = useInView({
    threshold: 0,
    rootMargin: '-83px 0px 1000px 0px',
  });

  const [selectedInventory, setSelectedInventory] = useState<ProductInventory | undefined>(getProductInventories(product)[0]);
  const [selectedQuantity, setSelectedQuantity] = useState(0);

  const [checkedBagsPack, setCheckedBagsPack] = useState(false);
  const [selectedBagsPack, setSelectedBagsPack] = useState<ProductPack | undefined>(undefined);
  const [maxWidthSmall, _setMaxWidthSmall] = useState('540px');
  const [maxWidthMedium, _setMaxWidthMedium] = useState('623px');

  const selectedItem = useMemo(() => {
    return selectedBagsPack ?
      selectedBagsPack : selectedInventory;
  }, [selectedBagsPack, selectedInventory]);

  const currentBagsPack = useMemo(() => {
    if (isBagsProduct(product) && selectedInventory) {
      return getBagsPack(selectedInventory);
    }
    return undefined;
  }, [getBagsPack, isBagsProduct, product, selectedInventory]);

  const handleCheckedBagsPackChange = useCallback((_event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setCheckedBagsPack(checked);
  }, []);

  const onClickAddCartBtn = useCallback(() => {
    if (selectedItem) {
      addCartItem(selectedItem, selectedQuantity);
    }
  }, [addCartItem, selectedItem, selectedQuantity]);

  const onClickPayNowBtn = useCallback(() => {
    if (selectedItem) {
      addCartItem(selectedItem, selectedQuantity, true);
    }
  }, [addCartItem, selectedItem, selectedQuantity])

  const onClickAddCartPackBtn = useCallback(() => {
    const everfreshPack = getProductPacks(everfreshProduct).length > 0 ? getProductPacks(everfreshProduct)[0] : undefined;
    if (everfreshPack) {
      addCartItem(everfreshPack, 1);
    }
  }, [addCartItem, everfreshProduct, getProductPacks]);

  const productH1 = useMemo(() => {
    let text = '';
    if (isEverfreshProduct(product)) {
      text = keywords.vacuumMachine.main;
    } else if (isBagsProduct(product)) {
      text = keywords.bags.main;
    }
    return (
      <Typography component="h1" variant="h1" sx={{ display: 'none' }}>
        { text }
      </Typography>
    );
  }, [isBagsProduct, isEverfreshProduct, product]);

  const productRating = useMemo(() => {
    if (!initialized) {
      return (
        <LoadingRating />
      );
    };
    return (
      <Link
        href={getProductPageUrl(product)}
        onClick={() => scrollToSection('reviews')}
        sx={{ textDecoration: 'none' }}
      >
        <Grid container>
          <Grid item>
            <Rating
              value={parseFloat(product.rating)}
              precision={0.5}
              readOnly
            />
          </Grid>
          <Grid item sx={{ ml: '6px' }}>
            <Typography component="span" variant="body1">
              {`(${product.reviewsCount})`}
            </Typography>
          </Grid>
        </Grid>
      </Link>
    );
  }, [getProductPageUrl, initialized, product]);

  const productTitle = useMemo(() => {
    let text = product.name.current;
    if (selectedItem) {
      text = selectedItem.description.current;
    }
    return (
      <Typography component="h2" variant="h1" color="text.primary">
        { text }
      </Typography>
    );
  }, [product.name, selectedItem]);

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

  const productPrice = useMemo(() => {
    let price = product.lowestRealPrice;
    let originPrice = product.lowestPrice;
    if ((selectedItem as ProductInventory)?.realPrice) {
      price = (selectedItem as ProductInventory).realPrice;
      originPrice = (selectedItem as ProductInventory).price;
    } else if ((selectedItem as ProductPack)?.inventories) {
      price = (selectedItem as ProductPack).price;
      originPrice = (selectedItem as ProductPack).originalPrice;
    }
    const discount = (product.activeDiscount || (selectedItem as ProductPack)?.inventories) ? true : false;
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
  }, [convertPriceToString, priceIcon, product.activeDiscount, product.lowestPrice, product.lowestRealPrice, selectedItem]);

  const everfreshPackText = useMemo(() => {
    const everfreshPack = getProductPacks(everfreshProduct).length > 0 ? getProductPacks(everfreshProduct)[0] : undefined;
    if (!everfreshPack) {
      return (<></>);
    }
    const price = everfreshPack.price;
    const originPrice = everfreshPack.originalPrice;
    const percent = NP.round(everfreshPack.discountPercent, 0);
    const dividerPackText = ' + ';
    const packTexts = everfreshPack.name.current.split(dividerPackText);
    return (
      <>
        <Grid container mb={1}>
          <Grid item>
            <Typography
              component="h2"
              variant="body1"
            >
              <Link
                href={getProductPageUrl(everfreshProduct)}
                noLinkStyle
              >
                { packTexts[0] }
              </Link>
              { dividerPackText }
              <Link
                href={getProductPageUrl(bagsProduct)}
                noLinkStyle
              >
                { packTexts[1] }
              </Link>
            </Typography>
          </Grid>
        </Grid>
        <Grid container columnSpacing={1} rowSpacing={1}>
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
      </>
    );
  }, [getProductPacks, everfreshProduct, getProductPageUrl, bagsProduct, intl, convertPriceToString]);

  const bagsPackDiscountPercent = useMemo(() => {
    const value = currentBagsPack?.discountPercent ? NP.round(currentBagsPack?.discountPercent, 0) : 0;
    return value;
  }, [currentBagsPack?.discountPercent]);

  /*const productDescription = useMemo(() => {
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

  const productComments = useMemo(() => {
    if (isEverfreshProduct(product) || isBagsProduct(product)) {
      return (
        <>
          <Typography component="div" variant="body1">
            <FormattedMessage id={isEverfreshProduct(product) ? 'everfresh.comment' : 'bags.comment'} />
          </Typography>
          <Box mt={1}>
            <Link href={pages.orders.path} variant="body1">
              <FormattedMessage id="productDetail.trackingLink" />
            </Link>
          </Box>
        </>
      );
    }
    return (<></>);
  }, [isBagsProduct, isEverfreshProduct, product]);

  const addCartBtn = useMemo(() => {
    if (initialized && selectedItem) {
      return (
        <Button
          fullWidth
          variant="contained"
          onClick={onClickAddCartBtn}
          disabled={selectedItem.quantity == 0}
          sx={{
            ...convertElementToSx(themeCustomElements.button.action.primary),
            mb: 3,
          }}
        >
          <FormattedMessage id="productDetail.addCartBtn" />
        </Button>
      );
    }
    return (
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
    );
  }, [initialized, onClickAddCartBtn, selectedItem]);

  const payNowBtn = useMemo(() => {
    if (initialized && selectedItem) {
      return (
        <Button
          fullWidth
          variant="contained"
          onClick={onClickPayNowBtn}
          disabled={selectedItem.quantity == 0}
          ref={payNowBtnRef}
          sx={{
            ...convertElementToSx(themeCustomElements.button.buyNow),
            mb: 3,
          }}
        >
          <FormattedMessage id="productDetail.payNowBtn" />
        </Button>
      );
    }
    return (
      <LoadingBtn
        fullWidth
        variant="contained"
        sx={{
          ...convertElementToSx(themeCustomElements.button.buyNow),
          mb: 3,
        }}
      >
        <FormattedMessage id="productDetail.payNowBtn" />
      </LoadingBtn>
    );
  }, [initialized, onClickPayNowBtn, payNowBtnRef, selectedItem]);

  const payNowBtnStatic = useMemo(() => {
    if (initialized && selectedItem && !payNowInView) {
      return (
        <Button
          fullWidth
          variant="contained"
          onClick={onClickPayNowBtn}
          disabled={selectedItem && selectedItem.quantity == 0}
          sx={{
            ...convertElementToSx(themeCustomElements.button.buyNow),
            position: 'fixed',
            bottom: '0px',
            left: '0px',
            zIndex: 10,
            borderRadius: '0px',
          }}
        >
          <FormattedMessage id="productDetail.payNowBtn" />
        </Button>
      );
    }
    return (<></>);
  }, [initialized, onClickPayNowBtn, payNowInView, selectedItem]);

  useEffect(() => {
    if (checkedBagsPack) {
      setSelectedBagsPack(currentBagsPack);
    } else {
      setSelectedBagsPack(undefined);
    }
  }, [checkedBagsPack, currentBagsPack]);

  return (
    <Box sx={{ overflow: 'hidden' }}>
      { productH1 }
      <Container>
        {/* General Product Section */}
        <Masonry columns={{ xs: 1, md: 2 }} spacing={0}>

          {/* Images */}
          <Box>
            <Box
              sx={{
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
                      alt: isEverfreshProduct(product) ?
                        keywords.vacuumMachine.main : keywords.bags.main,
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
                { productRating }
              </Box>
              <Box sx={{ mb: 2 }}>
                { productTitle }
              </Box>
              <Box sx={{ mb: 2 }}>
                { productPrice }
              </Box>
              {/* Icons */}
              <Grid container spacing={2} mb={3}>
                { landingIcon(faTruck, { id: 'productDetail.icons.shipping' }, 2) }
                { landingIcon(faLock, { id: 'productDetail.icons.payment' }, 3) }
                { landingIcon(faPhoneVolume, { id: 'productDetail.icons.support' }, 2.5) }
                { landingIcon(faArrowRightArrowLeft, { id: 'productDetail.icons.guarantee' }, 3) }
              </Grid>
              {/* Cart inputs */}
              <Grid container columnSpacing={2} rowSpacing={1}>
                {/* isBagsProduct(product) && */}
                  <Grid item>
                    <SelectInventory
                      product={product}
                      selectedInventory={selectedInventory}
                      setSelectedInventory={setSelectedInventory}
                    />
                  </Grid>
                <Grid item mb={2}>
                  <SelectInventoryQuantity
                    item={selectedInventory}
                    selectedQuantity={selectedQuantity}
                    setSelectedQuantity={setSelectedQuantity}
                    label={true}
                  />
                </Grid>
              </Grid>
              { isBagsProduct(product) &&
                <Box mb={2}>
                  <FormControlLabel
                    label={
                      <Typography variant="body1Head">
                        {intl.formatMessage({ id: `bags.pack.title` }, { value: bagsPackDiscountPercent })}
                      </Typography>
                    }
                    control={
                      <Checkbox
                        id="bags-pack-select"
                        disabled={!initialized || !selectedItem}
                        checked={checkedBagsPack}
                        onChange={handleCheckedBagsPackChange}
                      />
                    }
                  />
                </Box>
              }
              { addCartBtn }
              { payNowBtn }
              { payNowBtnStatic }
              <Box>
                { productComments }
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
                  <Link
                    href={getProductPageUrl(everfreshProduct)}
                    noLinkStyle
                  >
                    <CustomImage
                      src={everfreshImgId}
                      alt={keywords.vacuumMachine.others[0]}
                      width="1080"
                      height="1080"
                      priority
                      layout="responsive"
                      objectFit="cover"
                      style={{ borderRadius: '10px' }}
                    />
                  </Link>
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
                  <Link
                    href={getProductPageUrl(bagsProduct)}
                    noLinkStyle
                  >
                    <CustomImage
                      src={bagsMIXImgId}
                      alt={keywords.bags.others[0]}
                      width="1080"
                      height="1080"
                      priority
                      layout="responsive"
                      objectFit="cover"
                      style={{ borderRadius: '10px' }}
                    />
                  </Link>
                </Grid>
                <Grid item xs={12} mt={1}>
                  { everfreshPackText }
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
