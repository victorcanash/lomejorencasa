import { useCallback, useMemo } from 'react';

import NP from 'number-precision'
import { useIntl, FormattedMessage } from 'react-intl';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import type { BundleConfig, ProductInventory, ProductPack } from '@core/types/products';
import { convertElementToSx } from '@core/utils/themes';
import Link from '@core/components/navigation/Link';
import Button from '@core/components/inputs/Button';
import CustomImage from '@core/components/multimedia/CustomImage';

import { themeCustomElements } from '@lib/config/theme/elements';
import { useAppContext } from '@core/contexts/AppContext';
import { useProductsContext } from '@core/contexts/ProductsContext';
import ProductPrice from '@core/components/ProductPrice';

type BundleDetailProps = {
  bundleConfig: BundleConfig,
  addCartItem: (productItem: ProductPack | ProductInventory, quantity: number) => void,
};

const BundleDetail = (props: BundleDetailProps) => {
  const {
    bundleConfig,
    addCartItem,
  } = props;

  const { initialized } = useAppContext();
  const { getLandingById, getPageUrlByLandingId } = useProductsContext();

  const intl = useIntl();

  const landing = useMemo(() => {
    return getLandingById(bundleConfig.landingId);
  }, [bundleConfig.landingId, getLandingById]);

  const productPack = useMemo(() => {
    return landing && landing.packs.length > 0 ? landing.packs[0] : undefined;
  }, [landing]);

  const onClickAddCartBtn = useCallback(() => {
    if (productPack) {
      addCartItem(productPack, 1);
    }
  }, [addCartItem, productPack]);

  const ProductPackTxt = useCallback(() => {
    if (!productPack) {
      return (<></>);
    }
    const price = productPack.price;
    const originPrice = productPack.originalPrice;
    const percent = productPack.discountPercent ? NP.round(productPack.discountPercent, 0) : undefined;
    let packText = productPack.name.current;
    if (bundleConfig.firstItem.name?.id) {
      packText = `${intl.formatMessage({ id: bundleConfig.firstItem.name.id }, bundleConfig.firstItem.name.values)}`;
      if (bundleConfig.secondItem?.name?.id) {
        packText += ` + ${intl.formatMessage({ id: bundleConfig.secondItem.name.id }, bundleConfig.secondItem.name.values)}`;
      }
    }
    return (
      <>
        <Grid container mb={1}>
          <Grid item>
            <Typography
              component="h2"
              variant="body1"
            >
              <Link
                href={getPageUrlByLandingId(bundleConfig.landingId)}
              >
                { packText }
              </Link>
            </Typography>
          </Grid>
        </Grid>
        <Grid container columnSpacing={1} rowSpacing={1}>
          <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
            <ProductPrice
              type="landingDetail"
              price={price}
              originPrice={originPrice}
            />
          </Grid>
          { percent &&
            <Grid item>
              <Typography
                component="div"
                variant="body1Head"
                sx={{
                  ...themeCustomElements.landingDetail?.price?.percentText ?
                    convertElementToSx(themeCustomElements.landingDetail.price.percentText) : undefined,
                }}
              >
                <FormattedMessage id="productDetail.pack.percent" values={{ value: percent }} />
              </Typography>
            </Grid>
          }
        </Grid>
      </>
    );
  }, [bundleConfig.firstItem.name?.id, bundleConfig.firstItem.name?.values, bundleConfig.landingId, bundleConfig.secondItem?.name?.id, bundleConfig.secondItem?.name?.values, getPageUrlByLandingId, intl, productPack]);

  return (
    <>
      <Typography
        variant="h3"
        color="text.primary"
        sx={{
          ...themeCustomElements.landingDetail?.bundleTitle ? convertElementToSx(themeCustomElements.landingDetail.bundleTitle) : undefined,
          textAlign: 'center',
        }}
      >
        <FormattedMessage id="productDetail.pack.title" />
      </Typography>
      <Grid container mt={2} justifyContent="center" alignItems="center" columnSpacing={bundleConfig.secondItem ? 1 : 2}>
        <Grid item xs={5.5}>
          <Link
            href={getPageUrlByLandingId(bundleConfig.secondItem ? bundleConfig.firstItem.landingId : bundleConfig.landingId)}
          >
            <CustomImage
              src={bundleConfig.firstItem.image}
              alt=""
              width="1080"
              height="1080"
              priority
              layout="responsive"
              objectFit="cover"
              style={{ borderRadius: '10px' }}
            />
          </Link>
        </Grid>
        { bundleConfig.secondItem ?
          <>
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
                href={getPageUrlByLandingId(bundleConfig.secondItem.landingId)}
              >
                <CustomImage
                  src={bundleConfig.secondItem.image}
                  alt=""
                  width="1080"
                  height="1080"
                  priority
                  layout="responsive"
                  objectFit="cover"
                  style={{ borderRadius: '10px' }}
                />
              </Link>
            </Grid>
          </>
          :
          <Grid item xs={4.5}>
            <Typography
              component='div'
              variant='h3'
              sx={{
                textTransform: 'uppercase',
                fontWeight: 700,
                fontSize: '60px',
              }}
            >
              {`x2`}
            </Typography>
          </Grid>
        }
        <Grid item xs={12} mt={1}>
          <ProductPackTxt />
        </Grid>
        <Grid item xs={12} mt={2}>
          <Button
            customtype="actionPrimary"
            loading={initialized ? undefined : 'true'}
            onClick={onClickAddCartBtn}
            sx={{
              py: 1, 
              mb: 3,
            }}
          >
            <FormattedMessage id="productDetail.addCartPackBtn" />
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default BundleDetail;
