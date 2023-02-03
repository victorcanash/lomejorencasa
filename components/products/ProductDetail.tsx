import { Fragment } from 'react';

import { useIntl, FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import type { Product } from '@core/types/products';
import LinkButton from '@core/components/LinkButton';

import { pages } from '@lib/constants/navigation';
import { everfreshProductId, bagsProductId } from '@lib/constants/products';
import { getAllProductImgsUrl } from '@lib/utils/products';
import useCart from '@lib/hooks/useCart';
import useSelectInventory from '@lib/hooks/useSelectInventory';
import useSelectInventoryQuantity from '@lib/hooks/useSelectInventoryQuantity';
import Carousel from '@components/ui/Carousel';
import EverfreshDetail from '@components/products/everfresh/EverfreshDetail';
import EverfreshTutorial from '@components/products/everfresh/EverfreshTutorial';
import BagsDetail from '@components/products/bags/BagsDetail';

type ProductDetailProps = {
  product: Product,
};

const ProductDetail = (props: ProductDetailProps) => {
  const { product } = props;

  const intl = useIntl();

  const { addCartItem } = useCart();
  const { Select: SelectInventory, selectedInventory, loaded: selectInventoryLoaded } = useSelectInventory(product);
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

  const otherProduct = () => {
    return everfreshProductId !== product.id && bagsProductId !== product.id;
  };

  const maxWidthCarousel = '540px';

  return (
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
          className='animate__animated animate__fadeInLeft'
        >
          <Box
            sx={{
              maxWidth: maxWidthCarousel, 
              m: 'auto',
            }}  
          >
            <Carousel 
              imgSources={getAllProductImgsUrl(product)} 
            />
          </Box>
        </Grid>

        {/* Content */}
        <Grid 
          item 
          xs={12}
          md={6}
          className='animate__animated animate__fadeIn'
        >
          <Box
            sx={{
              maxWidth: maxWidthCarousel, 
              m: 'auto',
            }}  
          >
            <Typography component={"h1"} variant={"h1"} sx={{ mb: 2 }}>
              { everfreshProduct() && 
                <FormattedMessage id="everfresh.h1" />
              }
              { bagsProduct() && 
                <FormattedMessage id="bags.h1" />
              }
              { otherProduct() && 
                `${product.name.current}`
              }
            </Typography>    
            { product.activeDiscount ?
              <Box sx={{ mb: 2 }}>
                <Typography component={"h2"} variant={"h1"} color="error">
                  {selectedInventory ? selectedInventory.realPrice : product.lowestRealPrice} €
                </Typography>
                <Typography component={"span"} variant={"body1"}>
                  <FormattedMessage id="productDetail.original" />: <s>{selectedInventory ? selectedInventory.price : product.lowestPrice} €</s>
                </Typography> 
                <Typography component={"span"} variant={"body1"} color="error"> 
                  {` -${product.activeDiscount.discountPercent}%`}
                </Typography> 
              </Box>
              :
              <Box sx={{ mb: 2 }}>
                <Typography component={"h2"} variant={"h1"}>
                  {selectedInventory ? selectedInventory.realPrice : product.lowestRealPrice} €
                </Typography>
              </Box>
            }
            <Typography component="h2" variant="body1" sx={{ mb: 2 }}>
              { everfreshProduct() &&
                <FormattedMessage id="everfresh.description" />
              }
              { bagsProduct() &&
                <FormattedMessage id="bags.description" />
              }
              { otherProduct() &&
                `${product.description.current}`
              }
            </Typography>
            { selectInventoryLoaded &&
              <>
                <FormControl 
                  sx={{ mb: 2 }} 
                  className='animate__animated animate__fadeIn'
                >
                  <SelectInventory />
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={onClickAddCartBtn}
                    disabled={!selectedInventory || selectedInventory.bigbuy.quantity == 0}
                    sx={{ mt: 1 }}
                  >
                    <FormattedMessage id="productDetail.addCartBtn" />
                  </Button>
                </FormControl>
                <FormControl 
                  sx={{ mb: 2 }} 
                  className='animate__animated animate__fadeIn'
                >
                  <SelectQuantity />
                </FormControl>
              </>
            }
            { everfreshProduct() &&
              <Typography component="div" variant="body1" sx={{ mb: 2 }}>
                <FormattedMessage id="everfresh.comment" />
              </Typography>
            }
            { bagsProduct() &&
              <Box mb={2}>
                <Typography component="div" variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                  <FormattedMessage id="bags.types.title" />
                </Typography>
                { [1,2,3,4,5,6].map((_item, index) => (
                  <Fragment key={index}>
                    <Typography component="div" variant="body1" sx={{ mb: 1, marginInlineStart: '15px' }}>
                      <Box sx={{ fontWeight: 500, display: 'inline-block' }}>
                        {`${intl.formatMessage({ id: `bags.types.${index + 1}.title` })}:`}
                      </Box>
                      {` ${intl.formatMessage({ id: `bags.types.${index + 1}.content` })}`}
                    </Typography>
                  </Fragment>
                ))}
              </Box>
            }
            { everfreshProduct() && 
              <LinkButton href={pages.bags.path}>
                <FormattedMessage 
                  id="everfresh.bags" 
                />
              </LinkButton>
            }
            { bagsProduct() && 
              <LinkButton href={pages.everfresh.path}>
                <FormattedMessage
                  id="bags.everfresh" 
                />
              </LinkButton>
            }
          </Box>
        </Grid>

      </Grid>


      {/* Everfesh Product Section */}
      { (everfreshProduct() || bagsProduct()) &&
        <>
          <Divider sx={{ mt: 5, mb: 5 }}/>

          { everfreshProduct() &&
            <>
              <EverfreshDetail />

              <Divider sx={{ mt: 5, mb: 5 }}/>
          
              <EverfreshTutorial 
                textId="everfresh.videoComment.1" 
                source={{ 
                  type: 'video',
                  src: require('../../public/videos/everfresh/everfresh1.mp4'),
                }} 
              />
              <EverfreshTutorial
                textId="everfresh.videoComment.2" 
                source={{ 
                  type: 'video',
                  src: require('../../public/videos/everfresh/everfresh2.mp4'),
                }} 
              />
              <EverfreshTutorial
                textId="everfresh.videoComment.2" 
                source={{ 
                  type: 'video',
                  src: require('../../public/videos/everfresh/everfresh3.mp4'),
                }} 
              />
            </>
          }

          { bagsProduct() &&
            <>
              <BagsDetail />
            </>
          }
        </>
      }

    </Container>
  );
};

export default ProductDetail;
