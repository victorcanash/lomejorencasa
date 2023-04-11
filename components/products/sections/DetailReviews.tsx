import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

import CustomImage from '@core/components/CustomImage';

import { useProductsContext } from '@lib/contexts/ProductsContext';
import useReviews from '@lib/hooks/useReviews';
import Title from '@components/ui/Title';
import Pagination from '@components/ui/Pagination';
import ProductReviewForm from '@components/forms/products/ProductReviewForm';

const DetailReviews = () => {
  const { listProductReviews } = useProductsContext();

  const { errorMsg, successMsg, handleChangePage, createProductReview} = useReviews();

  return (
    <Container id="reviews">
      <Box 
        maxWidth="md"
        m="auto"
      >
        <Title
          type="h2"
          texts={{
            title: {
              id: 'productDetail.reviews.title'
            },
          }}
          divider={true}
        />

        <Box mb={4}>
          <ProductReviewForm
            errorMsg={errorMsg}
            successMsg={successMsg}
            createProductReview={createProductReview}
          />
        </Box>

        { listProductReviews.reviews.length > 0 ?
          <Grid
            container
            spacing={2}
          >
            { listProductReviews.reviews.map((item, index) => (
              <Grid
                key={index}
                item 
                xs={6}
                sm_md={4}
              >
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
                    { item.imageUrl &&
                      <CardMedia>
                        <Box sx={{ position: 'relative', width: '100%' }}>
                          <CustomImage
                            src={item.imageUrl}
                            alt="Product review"
                            layout="fill"
                            objectFit="contain"
                          />
                        </Box>
                      </CardMedia>
                    }
                    <CardContent>
                      <Typography component="div" variant="body2" mb={1}>
                        { item.publicName }
                      </Typography>
                      <Grid container mb={1}>
                        <Grid item>
                          <Rating
                            value={item.rating}
                            precision={0.5}
                            readOnly
                          />
                        </Grid>
                      </Grid>
                      <Typography component="div" variant="body2" mb={1}>
                        { item.title }
                      </Typography>
                      <Typography component="div" variant="body2" mb={1}>
                        <FormattedMessage
                          id="productDetail.reviews.date"
                          values={{ date: item.createdAt }}
                        />
                      </Typography>
                      <Typography component="div" variant="body2">
                        { item.description }
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            ))}
          </Grid>
          :
          <Typography component="h3" variant="body1" sx={{ textAlign: "center" }}>
            <FormattedMessage
              id="productDetail.reviews.noItems"
            />
          </Typography>
        }

        <Box mt={4} />

        <Pagination
          totalPages={listProductReviews.totalPages}
          currentPage={listProductReviews.currentPage}
          onChangePage={handleChangePage}
        />
      </Box>
    </Container>
  );
};

export default DetailReviews;
