import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { FormattedMessage } from 'react-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import Masonry from '@mui/lab/Masonry'

import type { Landing } from '@core/types/products'
import { convertToDate } from '@core/utils/dates'
import { convertElementToSx } from '@core/utils/themes'
import { useAppContext } from '@core/contexts/AppContext'
import { useProductsContext } from '@core/contexts/ProductsContext'
import useReviews from '@core/hooks/useReviews'
import Title from '@core/components/ui/Title'
import Pagination from '@core/components/ui/Pagination'
import CustomImage from '@core/components/multimedia/CustomImage'
import Link from '@core/components/navigation/Link'
import ProductReviewForm from '@core/components/forms/products/ProductReviewForm'

import { themeCustomElements } from '@lib/config/theme/elements'

interface ProductReviewsProps {
  landing?: Landing
}

const ProductReviews = (props: ProductReviewsProps) => {
  const {
    landing
  } = props

  const { initialized } = useAppContext()
  const { getItemPath } = useProductsContext()

  const router = useRouter()

  const {
    errorMsg,
    successMsg,
    reviews,
    currentPage,
    totalPages,
    handleChangePage,
    createProductReview
  } = useReviews(landing)

  const [expandedForm, setExpandedForm] = useState(false)

  const getReviewsQueries = useCallback(() => {
    const { email } = router.query
    if (typeof email === 'string') {
      return { email }
    }
    return undefined
  }, [router.query])

  useEffect(() => {
    const queries = getReviewsQueries()
    if (queries != null) {
      setExpandedForm(true)
    }
  }, [getReviewsQueries])

  return (
    <>
      { initialized &&
        <>
          <Container id="reviews" sx={{ mb: 4 }}>
            <Box
              m="auto"
            >
              <Title
                type="h2"
                texts={{
                  title: {
                    id: 'productDetail.reviews.title'
                  }
                }}
                divider={true}
              />

              {/* Create ProductReview Form */}
              { (landing != null) &&
                <ProductReviewForm
                  landing={landing}
                  errorMsg={errorMsg}
                  successMsg={successMsg}
                  createProductReview={createProductReview}
                  setExpanded={setExpandedForm}
                  expanded={expandedForm}
                  emailQuery={getReviewsQueries()?.email}
                />
              }
            </Box>
          </Container>
          <Container sx={{ px: { xs: 1.5, sm: 2 } }}>
            <Box
              m="auto"
            >

              {/* ProductReview List */}
              { reviews.length > 0
                ? <Masonry columns={{ xs: 2, sm: 2, md: 3 }} spacing={0}>
                  { reviews.map((review, index) => (
                    <Box key={index}>
                      <Box
                        sx={{
                          maxWidth: '350px',
                          m: 'auto',
                          mb: {
                            xs: 1,
                            sm: 2
                          },
                          px: {
                            xs: 0.5,
                            sm: 1
                          }
                        }}
                      >
                        <Card
                          sx={{
                            borderRadius: '15px'
                          }}
                        >
                          <CardHeader
                            title={
                              <Grid container justifyContent="space-between">
                                <Grid item>
                                  <Rating
                                    value={review.rating}
                                    precision={0.5}
                                    readOnly
                                  />
                                </Grid>
                                <Grid item>
                                  <Typography component="div" variant="body2" color="text.disabled" width="min-content">
                                    { convertToDate(review.createdAt, router.locale) }
                                  </Typography>
                                </Grid>
                              </Grid>
                            }
                            subheader={
                              <>
                                <Typography component="div" variant="body1" color="text.primary">
                                  {review.publicName}
                                </Typography>
                                <Typography
                                  component="div"
                                  variant="body2"
                                  sx={{
                                    ...((themeCustomElements.reviews?.verifiedText) != null)
                                      ? convertElementToSx(themeCustomElements.reviews.verifiedText)
                                      : undefined
                                  }}
                                >
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
                          { (review.imageUrl != null) &&
                            <CardMedia>
                              <Box
                                sx={{
                                  position: 'relative',
                                  width: '100%',
                                  margin: 'auto',
                                  paddingTop: '100%'
                                }}
                              >
                                <CustomImage
                                  src={review.imageUrl}
                                  layout="fill"
                                  objectFit="cover"
                                />
                              </Box>
                            </CardMedia>
                          }
                          <CardContent
                            sx={{
                              mt: (review.imageUrl != null) ? undefined : -2
                            }}
                          >
                            { ((landing != null) || (review.landing == null))
                              ? <Typography
                                component="div"
                                variant="body1Head"
                                mb={1}
                                sx={{ fontSize: '16px', fontWeight: '600' }}
                              >
                                { review.landing?.name.current ?? '' }
                              </Typography>
                              : <Typography
                                component={Link}
                                href={getItemPath(review.landing)}
                                variant="body1Head"
                                mb={1}
                                sx={{ fontSize: '16px', fontWeight: '600' }}
                              >
                                { review.landing.name.current }
                              </Typography>
                            }
                            <Typography component="div" variant="body1Head" mb={1}>
                              { review.title }
                            </Typography>
                            <Typography component="div" variant="body1">
                              { review.description }
                            </Typography>
                          </CardContent>
                        </Card>
                      </Box>
                    </Box>
                  ))}
                </Masonry>
                : <Typography component="h3" variant="body1" sx={{ textAlign: 'center' }}>
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
                  setExpandedForm(false)
                  handleChangePage(event, page)
                }}
              />
            </Box>
          </Container>
        </>
      }
    </>
  )
}

export default ProductReviews
