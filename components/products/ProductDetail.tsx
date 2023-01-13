import { FormattedMessage } from 'react-intl';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

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

  return (
    <>
      <Grid
        container
        className='animate__animated animate__fadeIn'
        spacing={3}
      >

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

        <Grid 
          item 
          sm={12} 
          md={6}
          className='animate__animated animate__fadeInRight'
        >
          <Typography component={"h1"} variant={"h1"} sx={{ mb: 2 }}>
            <FormattedMessage id="productDetail.h1" />
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
            <FormattedMessage id="productDetail.description" />
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
            <FormattedMessage id="productDetail.comment" />
          </Typography>
        </Grid>
      
      </Grid>

        <Grid 
          item 
          xs={12} 
          sm={12} 
          md={6}
          className='animate__animated animate__fadeInRight'
        >
          {divider}
          <Typography component="div" variant="h1">
            <FormattedMessage id="productDetail.details.title" />
          </Typography>
          <ul>
            <Typography component="li" variant="body1" style={liStyle}>
              <FormattedMessage id="productDetail.details.1" />
            </Typography>
            <Typography component="li" variant="body1" style={liStyle}>
              <FormattedMessage id="productDetail.details.2" />
            </Typography>
            <Typography component="li" variant="body1" style={liStyle}>
              <FormattedMessage id="productDetail.details.3" />
            </Typography>
            <Typography component="li" variant="body1" style={liStyle}>
              <FormattedMessage id="productDetail.details.4" />
            </Typography>
            <Typography component="li" variant="body1" style={liStyle}>
              <FormattedMessage id="productDetail.details.5" />
            </Typography>
            <Typography component="li" variant="body1" style={liStyle}>
              <FormattedMessage id="productDetail.details.6" />
            </Typography>
          </ul>
        </Grid>
        
        <Grid 
          item 
          xs={12} 
          sm={12} 
          md={6}
          className='animate__animated animate__fadeInRight'
        >
          {divider}
          <Typography component="div" variant="h1">
            <FormattedMessage id="productDetail.characteristics.title" />
          </Typography>
          <ul>
            <Typography component="li" variant="body1" style={liStyle}>
              <FormattedMessage id="productDetail.characteristics.1" />
            </Typography>
            <Typography component="li" variant="body1" style={liStyle}>
              <FormattedMessage id="productDetail.characteristics.2" />
            </Typography>
            <Typography component="li" variant="body1" style={liStyle}>
              <FormattedMessage id="productDetail.characteristics.3" />
            </Typography>
            <Typography component="li" variant="body1" style={liStyle}>
              <FormattedMessage id="productDetail.characteristics.4" />
            </Typography>
          </ul>
        </Grid>
        
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

        <Grid 
          item 
          xs={12} 
          sm={12} 
          md={6}
          className='animate__animated animate__fadeInRight'
        >
          {divider}
          <Typography component="div" variant="h1">
            <FormattedMessage id="productDetail.dimensions.title" />
          </Typography>
          <ul>
            <Typography component="li" variant="body1" style={liStyle}>
              <FormattedMessage id="productDetail.dimensions.packaging" />
            </Typography>
            <Typography component="li" variant="body1" style={liStyle}>
              <FormattedMessage id="productDetail.dimensions.bags" />
              <ul>
                <Typography component="li" variant="body1" style={liStyle}>
                  <FormattedMessage id="productDetail.dimensions.bags.1" />
                </Typography>
                <Typography component="li" variant="body1" style={liStyle}>
                  <FormattedMessage id="productDetail.dimensions.bags.2" />
                </Typography>
              </ul>
            </Typography>
          </ul>
        </Grid>
        
        <Grid 
          item 
          xs={12} 
          sm={12} 
          md={6}
          className='animate__animated animate__fadeInRight'
        >
          {divider}
          <Typography component="div" variant="body1" sx={{ mb: 2 }}>
            <FormattedMessage id="productDetail.videoComment.1" />
          </Typography>
        </Grid>
        
        <Grid 
          item 
          xs={12} 
          sm={12} 
          md={6}
          className='animate__animated animate__fadeInRight'
        >
          {divider}
          <Typography component="div" variant="body1">
            <FormattedMessage id="productDetail.videoComment.2" />
          </Typography>
        </Grid>

        <Grid 
          item 
          xs={12} 
          sm={12} 
          md={6}
          className='animate__animated animate__fadeInRight'
        >
          {divider}
          <Typography component="div" variant="h1">
            <FormattedMessage id="productDetail.bags" />
          </Typography>
        </Grid>
    </>
  );
};

export default ProductDetail;
