import { useRouter } from 'next/router';
import Image, { StaticImageData } from 'next/image';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { FormattedMessage } from 'react-intl';

type ProductReviewProps = {
  imgSrc: string | StaticImageData,
  username: string,
  title: string,
  description: string,
  stars: 0 | 1 | 2 | 3 | 4 | 5,
  date: Date,
}
const ProductReview = (props: ProductReviewProps) => {
  const {
    imgSrc,
    username,
    title,
    description,
    stars,
    date,
  } = props;

  const router = useRouter();

  const starsImgs = () => {
    const starsIcons: JSX.Element[] = [];
    for (let i = 0; i < 5; i++) {
      if (stars > i) {
        starsIcons.push(<StarOutlinedIcon key={i} fontSize="medium" />);
      } else {
        starsIcons.push(<StarBorderOutlinedIcon key={i} fontSize="medium" />);
      }
    }
    return starsIcons;
  };

  return (
    <Box
      sx={{
        maxWidth: '300px',
        margin: 'auto',
      }}
    >
      <Card 
        sx={{
          borderRadius: '15px',
        }}
      >
        <CardMedia>
          <div style={{ position: 'relative', width: '100%' }}>
            <Image
              src={imgSrc}
              alt="Product image"
              layout="responsive" 
              objectFit="cover"
              quality="100"
            />
          </div>
        </CardMedia>
        <CardContent>
          <Typography component="div" variant="body2" mb={1}>
            { username }
          </Typography>
          <Grid container mb={1}>
            <Grid item>
              {starsImgs()}
            </Grid>
          </Grid>
          <Typography component="div" variant="body2" mb={1}>
            { title }
          </Typography>
          <Typography component="div" variant="body2" mb={1}>
            <FormattedMessage
              id="productDetail.reviews.date"
              values={{ date: date.toLocaleDateString(router.locale) }}
            />
          </Typography>
          <Typography component="div" variant="body2">
            { description }
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductReview;
