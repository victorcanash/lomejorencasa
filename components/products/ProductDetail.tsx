import { FormattedMessage } from 'react-intl';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import { everfreshProductId, bagProductId } from '@core/constants/products';
import { Product } from '@core/types/products';
import { getProductImgUrl } from '@core/utils/products';
import useCart from '@lib/hooks/useCart';
import useSelectInventory from '@lib/hooks/useSelectInventory';
import Carousel from '@components/ui/Carousel';

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
  const divider = <Divider sx={{ mt: 4, mb: 4 }}/>

  const liStyle = {
    marginBottom: '10px',
  };

  const everfreshProduct = () => {
    return everfreshProductId === product.id;
  }

  const bagProduct = () => {
    return bagProductId === product.id;
  }

  const otherProduct = () => {
    return everfreshProductId !== product.id && bagProductId !== product.id;
  }

  return (
    <>
      {/* Main Section */}
      <Grid
        container
        className='animate__animated animate__fadeIn'
        spacing={3}
      >
        {/* Images */}
        <Grid
          item
          sm={12}
          md={6}
          className='animate__animated animate__fadeInLeft'
          sx= {{ mb: 1 }}
        >
          <Card raised sx={{ maxWidth: '600px', margin: 'auto' }}>
            <CardMedia>
              <Carousel 
                imgSources={product.imageNames.map((_item, index) => { return getProductImgUrl(product, index); })} 
              />
            </CardMedia>
          </Card>
        </Grid>
        {/* Texts */}
        <Grid 
          item 
          sm={12} 
          md={6}
          className='animate__animated animate__fadeInRight'
        >
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
          <Typography component="div" variant="body1" sx={{ mb: 1 }}>
            {
              (everfreshProduct() || bagProduct()) && <FormattedMessage id="everfresh.comment" />
            }
          </Typography>
        </Grid> 
      </Grid>

      {/* Everfresh Details Section */}
      { (everfreshProduct() || bagProduct()) &&
        <Grid 
          item 
          xs={12} 
          sm={12} 
          md={6}
          className='animate__animated animate__fadeInRight'
        >
          {divider}
          <Typography component="div" variant="h1">
            <FormattedMessage id="everfresh.details.title" />
          </Typography>
          <ul>
            <Typography component="li" variant="body1" style={liStyle}>
              <FormattedMessage id="everfresh.details.1" />
            </Typography>
            <Typography component="li" variant="body1" style={liStyle}>
              <FormattedMessage id="everfresh.details.2" />
            </Typography>
            <Typography component="li" variant="body1" style={liStyle}>
              <FormattedMessage id="everfresh.details.3" />
            </Typography>
            <Typography component="li" variant="body1" style={liStyle}>
              <FormattedMessage id="everfresh.details.4" />
            </Typography>
            <Typography component="li" variant="body1" style={liStyle}>
              <FormattedMessage id="everfresh.details.5" />
            </Typography>
            <Typography component="li" variant="body1" style={liStyle}>
              <FormattedMessage id="everfresh.details.6" />
            </Typography>
          </ul>
        </Grid>
      }
      {/* Everfresh Characteristics Section */}
      { (everfreshProduct() || bagProduct()) &&
        <Grid 
          item 
          xs={12} 
          sm={12} 
          md={6}
          className='animate__animated animate__fadeInRight'
        >
          {divider}
          <Typography component="div" variant="h1">
            <FormattedMessage id="everfresh.characteristics.title" />
          </Typography>
          <ul>
            <Typography component="li" variant="body1" style={liStyle}>
              <FormattedMessage id="everfresh.characteristics.1" />
            </Typography>
            <Typography component="li" variant="body1" style={liStyle}>
              <FormattedMessage id="everfresh.characteristics.2" />
            </Typography>
            <Typography component="li" variant="body1" style={liStyle}>
              <FormattedMessage id="everfresh.characteristics.3" />
            </Typography>
            <Typography component="li" variant="body1" style={liStyle}>
              <FormattedMessage id="everfresh.characteristics.4" />
            </Typography>
          </ul>
        </Grid>
      }
      {/* Shipping Section */}
      <Grid 
        item 
        xs={12} 
        sm={12} 
        md={6}
        className='animate__animated animate__fadeInRight'
      >
        {divider}
        <Typography component="div" variant="h1">
          <FormattedMessage id="productDetail.shipping.title" />
        </Typography>
        <ul>
          <Typography component="li" variant="body1" style={liStyle}>
            <FormattedMessage id="productDetail.shipping.1" />
          </Typography>
          <Typography component="li" variant="body1" style={liStyle}>
            <FormattedMessage id="productDetail.shipping.2" />
          </Typography>
          <Typography component="li" variant="body1" style={liStyle}>
            <FormattedMessage id="productDetail.shipping.3" />
          </Typography>
        </ul>
      </Grid>
      {/* Everfresh Dimensions Section */}
      { (everfreshProduct() || bagProduct()) &&
        <Grid 
          item 
          xs={12} 
          sm={12} 
          md={6}
          className='animate__animated animate__fadeInRight'
        >
          {divider}
          <Typography component="div" variant="h1">
            <FormattedMessage id="everfresh.dimensions.title" />
          </Typography>
          <ul>
            <Typography component="li" variant="body1" style={liStyle}>
              <FormattedMessage id="everfresh.dimensions.packaging" />
            </Typography>
            <Typography component="li" variant="body1" style={liStyle}>
              <FormattedMessage id="everfresh.dimensions.bags" />
              <ul>
                <Typography component="li" variant="body1" style={liStyle} sx={{ mt: 1 }}>
                  <FormattedMessage id="everfresh.dimensions.bags.1" />
                </Typography>
                <Typography component="li" variant="body1" style={liStyle}>
                  <FormattedMessage id="everfresh.dimensions.bags.2" />
                </Typography>
              </ul>
            </Typography>
          </ul>
        </Grid>
      } 
      
      {/* Everfresh Video 1 */}
      { (everfreshProduct() || bagProduct()) &&
        <Grid 
          item 
          xs={12} 
          sm={12} 
          md={6}
          className='animate__animated animate__fadeInRight'
        >
          {divider}
          <Typography component="div" variant="body1" sx={{ mb: 2 }}>
            <FormattedMessage id="everfresh.videoComment.1" />
          </Typography>
        </Grid>
      }

      {/* Everfresh Video 2 */}
      { (everfreshProduct() || bagProduct()) &&
        <Grid 
          item 
          xs={12} 
          sm={12} 
          md={6}
          className='animate__animated animate__fadeInRight'
        >
          {divider}
          <Typography component="div" variant="body1">
            <FormattedMessage id="everfresh.videoComment.2" />
          </Typography>
        </Grid>
      }

      {/* Everfresh Bags Section */}
      { everfreshProduct() &&
        <Grid 
          item 
          xs={12} 
          sm={12} 
          md={6}
          className='animate__animated animate__fadeInRight'
        >
          {divider}
          <Typography component="div" variant="h1">
            <FormattedMessage id="everfresh.bags" />
          </Typography>
        </Grid>
      }
    </>
  );
};

export default ProductDetail;
