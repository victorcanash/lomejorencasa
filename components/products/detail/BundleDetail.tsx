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
import Button from '@mui/material/Button';

import type { BundleConfig, ProductInventory, ProductPack } from '@core/types/products';
import { convertElementToSx } from '@core/utils/themes';
import Link from '@core/components/Link';
import CustomImage from '@core/components/CustomImage';

import colors from '@lib/constants/themes/colors';
import { themeCustomElements } from '@lib/constants/themes/elements';
import { useAppContext } from '@lib/contexts/AppContext';
import { useProductsContext } from '@lib/contexts/ProductsContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import LoadingBtn from '@components/ui/LoadingBtn';

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
  const { convertPriceToString } = useAuthContext();

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
    // const packTexts = productPack.name.current.split(' + ');
    return (
      <>
        <Grid container mb={1}>
          <Grid item>
            <Typography
              component="h2"
              variant="body1"
            >
              {/*<Link
                href={firstItemPath}
                noLinkStyle
              >
                { packTexts[0] }
              </Link>
              { dividerPackText }
              <Link
                href={secondItemPath}
                noLinkStyle
              >
                { packTexts[1] }
              </Link>*/}
              <Link
                href={getPageUrlByLandingId(bundleConfig.landingId)}
                noLinkStyle
              >
                { productPack.name.current }
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
          { percent &&
            <Grid item>
              <Typography component="div" variant="body1Head" sx={convertElementToSx(themeCustomElements.landing.priceContent.percentText)}>
                <FormattedMessage id="productDetail.pack.percent" values={{ value: percent }} />
              </Typography>
            </Grid>
          }
        </Grid>
      </>
    );
  }, [bundleConfig.landingId, convertPriceToString, getPageUrlByLandingId, intl, productPack]);

  return (
    <>
      <Typography variant="h3" color="text.primary" sx={{...convertElementToSx(themeCustomElements.landing.selectLabel), textAlign: 'center'}}>
        <FormattedMessage id="productDetail.pack.title" />
      </Typography>
      <Grid container mt={2} justifyContent="center" alignItems="center" columnSpacing={1}>
        <Grid item xs={5.5}>
          <Link
            href={getPageUrlByLandingId(bundleConfig.firstItem.landingId)}
            noLinkStyle
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
            noLinkStyle
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
        <Grid item xs={12} mt={1}>
          <ProductPackTxt />
        </Grid>
        <Grid item xs={12} mt={2}>
          { initialized ?
            <Button
              variant="contained"
              onClick={onClickAddCartBtn}
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
    </>
  );
};

export default BundleDetail;
