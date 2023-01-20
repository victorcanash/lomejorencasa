import { FormattedMessage } from 'react-intl';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import { pages } from '@lib/constants/navigation';
import { everfreshProductId, bagProductId } from '@core/constants/products';
import { Product } from '@core/types/products';
import { getAllProductImgsUrl } from '@core/utils/products';
import LinkButton from '@core/components/LinkButton';
import useCart from '@lib/hooks/useCart';
import useSelectInventory from '@lib/hooks/useSelectInventory';
import Carousel from '@components/ui/Carousel';
import EverfreshDetail from '@components/products/everfresh/EverfreshDetail';
import EverfreshTutorial from '@components/products/everfresh/EverfreshTutorial';

import placeholder from 'public/images/placeholder.jpeg';

type ProductDetailProps = {
  product: Product,
};

const ProductDetail = (props: ProductDetailProps) => {
  const { product } = props;

  const { addCartItem } = useCart();
  const { Select, selectedInventory, loaded } = useSelectInventory(product);

  const onClickAddCartBtn = () => {
    if (selectedInventory) {
      addCartItem(selectedInventory);
    }
  };

  const everfreshProduct = () => {
    return everfreshProductId === product.id;
  };

  const bagProduct = () => {
    return bagProductId === product.id;
  };

  const otherProduct = () => {
    return everfreshProductId !== product.id && bagProductId !== product.id;
  };

  return (
    <>
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
          <Card raised className='centered-container-img'>
            <CardMedia>
              <Carousel 
                imgSources={getAllProductImgsUrl(product)} 
              />
            </CardMedia>
          </Card>
        </Grid>

        {/* Texts */}
        <Grid 
          item 
          xs={12}
          md={6}
          className='animate__animated animate__fadeIn'
        >
          <Box className="centered-container-img">
            <Typography component={"h1"} variant={"h1"} sx={{ mb: 2 }}>
              {
                everfreshProduct() && <FormattedMessage id="everfresh.h1" />
              }
              {
                bagProduct() && <FormattedMessage id="bags.h1" />
              }
              {
                otherProduct() && `${product.name.current}`
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
            <Typography component="h2" variant="body1" sx={{ mb: 3 }}>
              {
                (everfreshProduct() || bagProduct()) && <FormattedMessage id="everfresh.description" />
              }
              {
                otherProduct() && `${product.description.current}`
              }
            </Typography>
            { loaded &&
              <FormControl 
                sx={{ mb: 3 }} 
                className='animate__animated animate__fadeIn'
              >
                <Select />
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
            }
            <Typography component="div" variant="body1" sx={{ mb: 3 }}>
              {
                (everfreshProduct() || bagProduct()) && <FormattedMessage id="everfresh.comment" />
              }
            </Typography>
            { everfreshProduct() && 
              <LinkButton href={pages.bags.path}>
                <FormattedMessage 
                  id="everfresh.bags" 
                />
              </LinkButton>
            }
            { bagProduct() && 
              <LinkButton href={pages.everfresh.path}>
                <FormattedMessage
                  id="bags.everfresh" 
                />
              </LinkButton>
            }
          </Box>
        </Grid>

      </Grid>

      <Divider sx={{ mt: 6, mb: 5 }}/>

      {/* Everfesh Product Section */}
      { (everfreshProduct() || bagProduct()) &&
        <>
          <EverfreshDetail />

          <Divider sx={{ mt: 3, mb: 5 }}/>
          
          <EverfreshTutorial textId="everfresh.videoComment.1" src={placeholder} />
          <EverfreshTutorial textId="everfresh.videoComment.2" src={placeholder} />
        </>
      }
    </>
  );
};

export default ProductDetail;
