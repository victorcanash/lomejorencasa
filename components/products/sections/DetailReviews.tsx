import { useCallback } from 'react';
import { useRouter } from 'next/router';

import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

import type { ProductReview } from '@core/types/products';
import CustomImage from '@core/components/CustomImage';

import colors from '@lib/constants/themes/colors';
import { useProductsContext } from '@lib/contexts/ProductsContext';
import useReviews from '@lib/hooks/useReviews';
import Title from '@components/ui/Title';
import Pagination from '@components/ui/Pagination';
import ProductReviewForm from '@components/forms/products/ProductReviewForm';

const DetailReviews = () => {
  const { listProductReviews, getProductInventory, getProductPack } = useProductsContext();

  const router = useRouter();

  const { errorMsg, successMsg, handleChangePage, createProductReview} = useReviews();

  const getRelatedProductName = useCallback((item: ProductReview) => {
    if (item.inventoryId) {
      return getProductInventory(item.inventoryId)?.name.current || '';
    }
    return getProductPack(item.packId || -1)?.name.current || '';
  }, [getProductInventory, getProductPack]);

  const convertToDate = useCallback((date: Date | string) => {
    return new Date(date).toLocaleDateString(router.locale)
  }, [router.locale]);

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
        {/* Create ProductReview Form */}
        <Box mb={4}>
          <ProductReviewForm
            errorMsg={errorMsg}
            successMsg={successMsg}
            createProductReview={createProductReview}
          />
        </Box>
        {/* ProductReview List */}
        { listProductReviews.reviews.length > 0 ?
          <Grid
            container
            spacing={2}
          >
            { listProductReviews.reviews.map((item, index) => (
              <Grid
                key={index}
                item
                xs={12}
                sm={6}
                md={4}
              >
                <Box
                  sx={{
                    maxWidth: '350px',
                    margin: 'auto',
                  }}
                >
                  <Card 
                    sx={{
                      borderRadius: '15px',
                    }}
                  >
                    <CardHeader
                      title={
                        <Grid container justifyContent="space-between">
                          <Grid item>
                            <Rating
                              value={item.rating}
                              precision={0.5}
                              readOnly
                            />        
                          </Grid>
                          <Grid item>
                            <Typography component="div" variant="body2" color="text.disabled" width="min-content">
                              { convertToDate(item.createdAt) }
                            </Typography>
                          </Grid>
                        </Grid>
                      }
                      subheader={
                        <>
                          <Typography component="div" variant="body1" color="text.primary">
                            {item.publicName}
                          </Typography>
                          <Typography component="div" variant="body2" sx={{ color: colors.text.verified }}>
                            <FormattedMessage
                              id="productDetail.reviews.verified"
                            />
                            <Box component="span" sx={{ ml: '4px' }}>
                              <FontAwesomeIcon icon={faCircleCheck} />
                            </Box>
                          </Typography>
                        </>
                      }
                    />
                    { item.imageUrl &&
                      <CardMedia>
                        <Box
                          sx={{
                            position: 'relative',
                            width: '100%',
                            margin: 'auto',
                            paddingTop: '100%',
                          }}
                        >
                          <CustomImage
                            src={item.imageUrl}
                            alt="Product review"
                            layout="fill"
                            objectFit="cover"
                          />
                        </Box>
                      </CardMedia>
                    }
                    <CardContent
                      sx={{
                        mt: item.imageUrl ? undefined : -2,
                      }}
                    >
                      <Typography component="div" variant="body1Head" mb={1} sx={{ fontSize: '16px', fontWeight: '600' }}>
                        { getRelatedProductName(item) }
                      </Typography>
                      <Typography component="div" variant="body1Head" mb={1}>
                        { item.title }
                      </Typography>
                      <Typography component="div" variant="body1">
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
        {/* Pagination */}
        <Box mt={5} />
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
