import Image from 'next/image'

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { pages } from '@core/config/navigation.config';
import { Product } from "@core/types/products";
import Link from '@core/components/Link';
import { getProductImgUrl } from '@core/utils/products';
import ProductDescription from '@components/products/ProductDescription';

type ProductItemProps = {
  product: Product,
};

const ProductItem = (props: ProductItemProps) => {
  const { product } = props;

  return (
    <Card className='animate__animated animate__fadeIn' raised>
      <CardActionArea component={Link} href={`${pages.productDetail.path}/${product.name.current}?id=${product.id}`} noLinkStyle>
        <CardMedia>
          <div>
            <Image
              src={getProductImgUrl(product)}
              alt="Product image"
              width="500"
              height="500"
              layout="responsive"
              objectFit="cover"
            />
          </div>
        </CardMedia>
        <CardContent>
          <ProductDescription product={product} detailed={false} selectedInventory={undefined} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductItem;
