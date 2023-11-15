import { useMemo } from 'react'

import { FormattedMessage } from 'react-intl'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

import type { FormatText } from '@core/types/texts'
import type { Landing, ProductCategoryGroup, ProductCategory } from '@core/types/products'
import { useProductsContext } from '@core/contexts/ProductsContext'
import usePagination from '@core/hooks/usePagination'
import Link from '@core/components/navigation/Link'
import Title from '@core/components/ui/Title'
import Pagination from '@core/components/ui/Pagination'
import CategoryList from '@core/components/CategoryList'
import LandingItem from './LandingItem'

import { pages } from '@lib/config/navigation.config'

interface LandingListProps {
  type: 'collectionsPage' | 'stack'
  category?: ProductCategoryGroup | ProductCategory
  landings: Landing[]
  title?: FormatText
  marginBottom?: boolean
}

const LandingList = (props: LandingListProps) => {
  const {
    type,
    category,
    landings,
    title,
    marginBottom
  } = props

  const { getItemPath } = useProductsContext()

  const {
    currentPage,
    allItems,
    totalPages,
    handleChangePage
  } = usePagination(landings, 'landings')

  const allLandings = useMemo(() => {
    return allItems as Landing[]
  }, [allItems])

  return (
    <>
      { type === 'stack' &&
        <Container>
          <Grid
            container
            wrap="nowrap"
            justifyContent="space-between"
            mt={6}
            mb={-1}
          >
            <Grid item>
              <Title
                type="h2"
                noMarginTop
                texts={{
                  title,
                  titleAdd: ((category != null) && (title == null))
                    ? category.name.current
                    : undefined
                }}
                divider={false}
              />
            </Grid>
            { (category != null) &&
              <Grid item>
                <Typography component={Link} variant="body1Head" href={getItemPath(category)} sx={{ lineHeight: '30px' }}>
                  <FormattedMessage
                    id="productList.all"
                  />
                </Typography>
              </Grid>
            }
          </Grid>
        </Container>
      }

      <Container
        id="landings"
        sx={{
          overflowX: type === 'stack' ? 'auto' : undefined,
          mb: (marginBottom === true) ? 6 : undefined,
          pt: type === 'stack' ? 1 : undefined
        }}
      >
        <Box
          m="auto"
        >

          {/* Header */}
          { type === 'collectionsPage' &&
            <>
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                sx={{ mb: 1 }}
              >
                <Link
                  underline="hover"
                  href={pages.home.path}
                >
                  <FormattedMessage
                    id="productList.home"
                  />
                </Link>
                <Link
                  underline="hover"
                  href={pages.collections.path}
                >
                  <FormattedMessage
                    id="productList.collections"
                  />
                </Link>
              </Breadcrumbs>

              <Title
                type="h1"
                noMarginTop
                texts={{
                  title,
                  titleAdd: ((category != null) && (title == null))
                    ? category.name.current
                    : undefined
                }}
                divider
              />
            </>
          }

          { (type === 'collectionsPage' && category != null && (category as ProductCategoryGroup).categories != null) &&
            <Box mx={-2} mb={4}>
              <CategoryList
                type="stack"
                categories={(category as ProductCategoryGroup).categories ?? []}
              />
            </Box>
          }

          {/* List */}
          { allLandings.length > 0
            ? <>

              {/* Masonry List */}
              { type === 'collectionsPage' &&
                <Grid container spacing={0}>
                  { allLandings.map((landing) => (
                    <Grid
                      key={landing.id}
                      item
                      xs={6}
                      sm_md={4}
                    >
                      <Box
                        sx={{
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
                        <LandingItem
                          landing={landing}
                        />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              }

              {/* Stack List */}
              { type === 'stack' &&
                <Stack
                  direction="row"
                  spacing={2}
                  pb={1}
                >
                  { allLandings.map((landing) => (
                    <Box
                      key={landing.id}
                      sx={{
                        position: 'relative',
                        width: 'max-content',
                        minWidth: {
                          xs: '43%',
                          sm_md: '30%'
                        }
                      }}
                    >
                      <LandingItem
                        landing={landing}
                      />
                    </Box>
                  ))}
                  <Box pl={1} sx={{ width: '250px' }} />
                </Stack>
              }
            </>
            : <Typography component="h3" variant="body1" sx={{ textAlign: 'center' }}>
              <FormattedMessage
                id="productList.noItems"
              />
            </Typography>
          }

          {/* Pagination */}
          { type === 'collectionsPage' &&
            <>
              <Box mt={allLandings.length > 0 ? 3 : 5} />
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onChangePage={handleChangePage}
              />
            </>
          }
        </Box>
      </Container>
    </>
  )
}

export default LandingList
