import { ReactElement, useState, useMemo, useCallback, useRef, useEffect } from 'react';

import { FormattedMessage } from 'react-intl';
import { useInView } from 'react-intersection-observer';
import { type Swiper as SwiperRef } from 'swiper';

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
import type { Source } from '@core/types/multimedia';
import { getFirstLandingItem, getLandingItems } from '@core/utils/products';
import Link from '@core/components/navigation/Link';
import { pages } from '@lib/config/navigation.config';
import { useAppContext } from '@core/contexts/AppContext';
import { useProductsContext } from '@core/contexts/ProductsContext';
import useCart from '@core/hooks/useCart';
import Button from '@core/components/inputs/Button';
import LandingCarousel from '@core/components/LandingDetail/LandingCarousel';
import LandingRating from '@core/components/LandingDetail/LandingRating';
import LandingPrice from '@core/components/LandingDetail/LandingPrice';
import LandingAdvantage from '@core/components/LandingDetail/LandingAdvantage';
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

  const title = useMemo(() => {
    let text = getFirstLandingItem(landingModel)?.name.current || '';
    if (selectedItem) {
      text = selectedItem.name.current;
    }
    return text;
  }, [landingModel, selectedItem]);

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

          {/* Carousel */}
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

              {/* Rating */}
              <Box>
                <LandingRating
                  landingModel={landingModel}
                  landingConfig={landingConfig}
                />
              </Box>

              {/* Title */}
              <Box sx={{ mb: 2 }}>
                <Typography component="h2" variant="h1" color="text.primary">
                  { title }
                </Typography>
              </Box>

              {/* Price */}
              <Box sx={{ mb: 2 }}>
                <LandingPrice
                  landingModel={landingModel}
                  selectedItem={selectedItem}
                />
              </Box>

              {/* Icons */}
              <Grid container spacing={2} mb={3}>
                <LandingAdvantage
                  icon={faTruck}
                  text={{
                    id: 'productDetail.icons.shipping',
                  }}
                  columnSpacing={2}
                />
                <LandingAdvantage
                  icon={faLock}
                  text={{
                    id: 'productDetail.icons.payment',
                  }}
                  columnSpacing={3}
                />
                <LandingAdvantage
                  icon={faPhoneVolume}
                  text={{
                    id: 'productDetail.icons.support',
                  }}
                  columnSpacing={2.5}
                />
                <LandingAdvantage
                  icon={faArrowRightArrowLeft}
                  text={{
                    id: 'productDetail.icons.guarantee',
                  }}
                  columnSpacing={3}
                />
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

              {/* Add cart button */}
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

              {/* Pay now button */}
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

              {/* Comments */}
              <Box>
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
