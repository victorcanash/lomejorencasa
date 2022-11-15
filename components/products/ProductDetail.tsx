import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';

import { Product } from '@core/types/products';
import { getProductImgUrl } from '@core/utils/products';
import useCart from '@lib/hooks/useCart';
import useSelectInventory from '@lib/hooks/useSelectInventory';
import GoBackBtn from '@components/ui/GoBackBtn';
import ProductDescription from '@components/products/ProductDescription';
import Carousel from '@components/ui/Carousel';

type ProductDetailProps = {
  product: Product,
};

const ProductDetail = (props: ProductDetailProps) => {
  const { product } = props;

  const { addCartItem } = useCart();
  const { selectedInventory, handleSelectChange, loadedSelect } = useSelectInventory(product);

  const handleChange = (event: SelectChangeEvent) => {
    handleSelectChange(event.target.value as string);
  };

  const onClickAddCartBtn = () => {
    if (selectedInventory) {
      addCartItem(product, selectedInventory);
    }
  };

  return (
    <>
      <Grid
        container
        mt={5}
        className='animate__animated animate__fadeIn'
        spacing={3}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          className='animate__animated animate__fadeInLeft'
        >
          <Card raised>
            <CardMedia>
              <Carousel 
                imgSources={product.imageNames.map((_item, index) => { return getProductImgUrl(product, index); })} 
              />
            </CardMedia>
          </Card>
          <GoBackBtn />
        </Grid>
        <Grid 
          item 
          xs={12} 
          sm={12} 
          md={6}
          className='animate__animated animate__fadeInRight'
        >
          <ProductDescription product={product} detailed={true} />
          { loadedSelect &&
            <FormControl 
              sx={{ mt: 3, mb: 2 }} 
              className='animate__animated animate__fadeIn'
            >
              <InputLabel id="inventory-select-label">Size</InputLabel>
              <Select
                labelId="inventory-select-label"
                id="inventory-select"
                value={selectedInventory?.size || 'Unique size'}
                label="Size"
                onChange={handleChange}
              >
                { product.inventories.map((item) => (
                  <MenuItem key={item.id} value={item.size || 'Unique size'}>
                    {`${item.size || 'Unique size'} (${item.quantity} left)`}
                  </MenuItem>
                ))}
              </Select>
              <Button
                fullWidth
                variant="contained"
                onClick={onClickAddCartBtn}
                sx={{ mt: 1 }}
              >
                Add to cart
              </Button>
            </FormControl>
          }
        </Grid>
      </Grid>
    </>
  );
};

export default ProductDetail;
