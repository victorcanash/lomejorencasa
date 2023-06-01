import { ReactElement, useState, useMemo, useCallback, useRef, useEffect } from 'react';

import { FormattedMessage } from 'react-intl';
import { useInView } from 'react-intersection-observer';
import { type Swiper as SwiperRef } from 'swiper';

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
} from '@fortawesome/free-solid-svg-icons';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Masonry from '@mui/lab/Masonry';

import type { Landing, LandingConfig, ProductInventory, ProductPack } from '@core/types/products';
import type { FormatText } from '@core/types/texts';
import type { Source } from '@core/types/multimedia';
import { convertElementToSx } from '@core/utils/themes';
import { getFirstLandingItem, getLandingItems, getProductPriceData } from '@core/utils/products';
import Link from '@core/components/navigation/Link';
import { pages } from '@lib/config/navigation.config';
import colors from '@lib/constants/themes/colors';
import { themeCustomElements } from '@lib/constants/themes/elements';
import { useAppContext } from '@core/contexts/AppContext';
import { useProductsContext } from '@core/contexts/ProductsContext';
import { useAuthContext } from '@core/contexts/AuthContext';
import useCart from '@core/hooks/useCart';
import Button from '@core/components/inputs/Button';
import LandingCarousel from '@core/components/LandingDetail/LandingCarousel';
import LandingRating from '@core/components/LandingDetail/LandingRating';
import SelectItem from '@core/components/inputs/SelectItem';
import SelectItemQuantity from '@core/components/inputs/SelectItemQuantity';
import BundleDetail from '@core/components/LandingDetail/BundleDetail';
import DetailCharacteristics from '@core/components/LandingDetail/characteristics';
import ProductReviews from '@core/components/ProductReviews';

type LandingDetailProps = {
  children?: ReactElement,
  landingModel: Landing,
  landingConfig: LandingConfig,
};

const LandingDetail = (props: LandingDetailProps) => {
  const { children, landingModel, landingConfig } = props;

  const { initialized } = useAppContext();
  const {
    getLandingImgsUrl,
  } = useProductsContext();
  const { convertPriceToString } = useAuthContext();

  const { addCartItem } = useCart(false);
  const { ref: payNowBtnRef, inView: payNowInView } = useInView({
    initialInView: true,
    threshold: 0,
    rootMargin: '-83px 0px 1000px 0px',
  });

  const swiperRef = useRef<SwiperRef>()

  const [selectedItem, setSelectedItem] = useState<ProductInventory | ProductPack | undefined>();
  const [selectedQuantity, setSelectedQuantity] = useState(0);

  const [maxWidthSmall, _setMaxWidthSmall] = useState('540px');
  const [maxWidthMedium, _setMaxWidthMedium] = useState('623px');

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

  const productTitle = useMemo(() => {
    let text = getFirstLandingItem(landingModel)?.name.current || '';
    if (selectedItem) {
      text = selectedItem.name.current;
    }
    return (
      <Typography component="h2" variant="h1" color="text.primary">
        { text }
      </Typography>
    );
  }, [landingModel, selectedItem]);

  const productPrice = useMemo(() => {
    let priceData = { price: 0, originPrice: 0 };
    if (selectedItem) {
      priceData = getProductPriceData(selectedItem);
    } else {
      const firstItem = getFirstLandingItem(landingModel);
      if (firstItem) {
        priceData = getProductPriceData(firstItem);
      }
    }
    return (
      <Grid container columnSpacing={2} rowSpacing={0.5}>
        <Grid item>
          <Typography
            component="h2"
            variant="h2"
            sx={{
              ...themeCustomElements.landing?.priceContent?.priceText ? convertElementToSx(themeCustomElements.landing.priceContent.priceText) : undefined,
            }}>
            { priceData.price !== priceData.originPrice ?
              <>
                <span
                  style={{ fontWeight: 500, textDecoration: 'line-through' }}
                >
                  <span style={{ color: colors.text.disabled }}>
                    {`${convertPriceToString(priceData.originPrice)}`}
                  </span>
                </span>
                {` ${convertPriceToString(priceData.price)}`}
              </>
              :
              <>
                {`${convertPriceToString(priceData.price)}`}
              </>
            }
          </Typography>
        </Grid>
        <Grid item sx={{ mt: '3px' }}>
          <Typography variant="body2">
            <FormattedMessage id="productDetail.price.iva" />
          </Typography>
        </Grid>
        <Grid item sx={{ display: 'flex', mb: 0.5 }}>
          <Box>
            <FontAwesomeIcon 
              size="2xl" 
              icon={faCcVisa}
            />
          </Box>
          <Box ml={1}>
            <FontAwesomeIcon 
              size="2xl" 
              icon={faCcMastercard}
            />
          </Box>
          <Box ml={1}>
            <FontAwesomeIcon 
              size="2xl" 
              icon={faCcPaypal}
            />
          </Box>
        </Grid>
      </Grid>
    );
  }, [convertPriceToString, landingModel, selectedItem]);

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
    return (
      <>
        { landingConfig.comment.id &&
          <Typography component="div" variant="body1">
            <FormattedMessage id={landingConfig.comment.id} values={landingConfig.comment.values} />
          </Typography>
        }
        <Box mt={1}>
          <Link href={pages.orders.path} variant="body1">
            <FormattedMessage id="productDetail.trackingLink" />
          </Link>
        </Box>
      </>
    );
  }, [landingConfig.comment.id, landingConfig.comment.values]);

  const addCartBtn = useMemo(() => {
    return (
      <Button
        customtype="actionPrimary"
        loading={initialized && selectedItem ? undefined : 'true'}
        fullWidth
        onClick={onClickAddCartBtn}
        disabled={selectedItem && selectedItem.quantity === 0}
        sx={{
          mb: 3,
        }}
      >
        <FormattedMessage id="productDetail.addCartBtn" />
      </Button>
    );
  }, [initialized, onClickAddCartBtn, selectedItem]);

  const payNowBtn = useMemo(() => {
    return (
      <Box
        sx={{
          mb: 3,
        }}
        ref={payNowBtnRef}
      >
        <Button
          customtype="payNow"
          loading={initialized && selectedItem ? undefined : 'true'}
          fullWidth
          onClick={onClickPayNowBtn}
          disabled={selectedItem && selectedItem.quantity === 0}
        >
          <FormattedMessage id="productDetail.payNowBtn" />
        </Button>
      </Box>
    );
  }, [initialized, onClickPayNowBtn, payNowBtnRef, selectedItem]);

  const payNowBtnStatic = useMemo(() => {
    return (
      <Slide appear={true} in={initialized && selectedItem && !payNowInView} direction="up">
        <Box
          sx={{
            position: 'fixed',
            bottom: '0px',
            left: '0px',
            zIndex: 10,
            width: '100%',
          }}
        >
          <Button
            customtype="payNow"
            fullWidth
            onClick={onClickPayNowBtn}
            disabled={selectedItem && selectedItem.quantity == 0}
            sx={{ borderRadius: '0px' }}
          >
            <FormattedMessage id="productDetail.payNowBtn" />
          </Button>
        </Box>
      </Slide>
    );
  }, [initialized, onClickPayNowBtn, payNowInView, selectedItem]);

  useEffect(() => {
    swiperRef.current?.slideTo(1, undefined, false);
  }, [landingModel]);

  return (
    <Box sx={{ overflow: 'hidden' }}>

      {/* H1 */}
      <Typography component="h1" variant="h1" sx={{ display: 'none' }}>
        { landingConfig.metas.title }
      </Typography>

      {/* General Product Section */}
      <Container>
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
              <LandingCarousel
                sources={
                  getLandingImgsUrl(landingModel, selectedItem).map((item, index, items) => {
                    return {
                      src: item,
                      alt: landingConfig.metas.imgsAlt,
                      priority: true,
                    } as Source;
                  })
                }
                swiperRef={swiperRef}
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
                <LandingRating
                  landingModel={landingModel}
                  landingConfig={landingConfig}
                />
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
                <Grid item>
                  <SelectItem
                    landingId={landingModel.id}
                    items={getLandingItems(landingModel)}
                    selectInputLabel={landingConfig.product?.selectInputTexts?.label || landingConfig.pack?.selectInputTexts?.label}
                    selectInputContent={landingConfig.product?.selectInputTexts?.content || landingConfig.pack?.selectInputTexts?.content}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                  />
                </Grid>
                <Grid item mb={2}>
                  <SelectItemQuantity
                    item={selectedItem}
                    selectedQuantity={selectedQuantity}
                    setSelectedQuantity={setSelectedQuantity}
                    label={true}
                  />
                </Grid>
              </Grid>
              { addCartBtn }
              { payNowBtn }
              { payNowBtnStatic }
              <Box>
                { productComments }
              </Box>
            </Box>
          </Box>

          {/* Bundle */}
          { landingConfig.bundle &&
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
                <BundleDetail
                  bundleConfig={landingConfig.bundle}
                  addCartItem={addCartItem}
                />
              </Box>
            </Box>
          }

        </Masonry>
      </Container>

      {/* Type Product Section */}
      <Box>
        <DetailCharacteristics
          landingConfig={landingConfig}
        />
        { children }
        <ProductReviews />
      </Box>
    </Box>
  );
};

export default LandingDetail;
