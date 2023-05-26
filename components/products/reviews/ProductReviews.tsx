import { useCallback, useEffect, useState } from 'react';
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
import Masonry from '@mui/lab/Masonry';

import { convertToDate } from '@core/utils/dates';
import { getPackGeneralName } from '@core/utils/products';
import CustomImage from '@core/components/CustomImage';

import { allLandingConfigs } from '@lib/constants/products';
import colors from '@lib/constants/themes/colors';
import { useAppContext } from '@lib/contexts/AppContext';
import useReviews from '@lib/hooks/useReviews';
import Title from '@core/components/ui/Title';
import Pagination from '@components/ui/Pagination';
import ProductReviewForm from '@components/forms/products/ProductReviewForm';

const ProductReviews = () => {
  const { initialized } = useAppContext();

  const router = useRouter();

  const {
    errorMsg,
    successMsg,
    reviews,
    currentPage,
    totalPages,
    handleChangePage,
    createProductReview,
  } = useReviews();

  const [expandedForm, setExpandedForm] = useState(false);

  const getReviewsQueries = useCallback(() => {
    const { email } = router.query;
    if (email && typeof email === 'string') {
      return { email };
    }
    return undefined;
  }, [router.query]);

  useEffect(() => {
    const queries = getReviewsQueries();
    if (queries) {
      setExpandedForm(true);
    }
  }, [getReviewsQueries]);

  return (
    <>
      { initialized &&
        <>
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
                  setExpanded={setExpandedForm}
                  expanded={expandedForm}
                  emailQuery={getReviewsQueries()?.email}
                />
              </Box>
            </Box>
          </Container>
          <Container sx={{ px: { xs: 1.5, sm: 2 } }}>
            <Box 
              maxWidth="md"
              m="auto"
            >
              {/* ProductReview List */}
              { reviews.length > 0 ?
                <Masonry columns={{ xs: 2, sm: 2, md: 3 }} spacing={0}>
                  { reviews.map((item, index) => (
                    <Box key={index}>
                      <Box
                        sx={{
                          maxWidth: '350px',
                          m: 'auto',
                          mb: {
                            xs: 1,
                            sm: 2,
                          },
                          px: {
                            xs: 0.5,
                            sm: 1,
                          }
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
                                    { convertToDate(item.createdAt, router.locale) }
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
                              {
                                item.pack ?
                                  getPackGeneralName(item.pack, allLandingConfigs) : item.product?.name.current
                              }
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
                    </Box>
                  ))}
                </Masonry>
                :
                <Typography component="h3" variant="body1" sx={{ textAlign: "center" }}>
                  <FormattedMessage
                    id="productDetail.reviews.noItems"
                  />
                </Typography>
              }
              {/* Pagination */}
              <Box mt={reviews.length > 0 ? 3 : 5} />
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onChangePage={(event, page) => {
                  setExpandedForm(false);
                  handleChangePage(event, page);
                }}
              />
            </Box>
          </Container>
        </>
      }
    </>
  );
};

export default ProductReviews;
