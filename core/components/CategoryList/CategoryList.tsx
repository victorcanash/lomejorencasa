import { useMemo } from 'react';

import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack'; 

import type { ProductCategory, ProductCategoryGroup } from '@core/types/products';
import usePagination from '@core/hooks/usePagination';
import Pagination from '@core/components/ui/Pagination';
import CategoryItem from './CategoryItem';

type CategoryListProps = {
  type: 'collectionsPage' | 'stack',
  categories: (ProductCategory | ProductCategoryGroup)[],
};

const CategoryList = (props: CategoryListProps) => {
  const {
    type,
    categories,
  } = props;

  const {
    currentPage,
    allItems,
    totalPages,
    handleChangePage,
  } = usePagination(categories, 'categories');

  const allCategories = useMemo(() => {
    return allItems as (ProductCategory | ProductCategoryGroup)[];
  }, [allItems]);

  return (
    <Container
      id="categories"
      sx={{
        mt: type === 'stack' ? 6 : undefined,
        overflowX: type === 'stack' ? 'auto' : undefined,
      }}
    >
      <Box 
        maxWidth="md"
        m="auto"
      >

        {/* Masonry List */}
        { type === 'collectionsPage' &&
          <>
            { allCategories.length > 0 ?
              <Grid container spacing={0}>
                { allCategories.map((category) => (
                  <Grid
                    key={category.id}
                    item
                    xs={6}
                    xs_sm={4}
                    sm={3}
                    md={2.4}
                  >
                    <Box
                      sx={{
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
                      <CategoryItem
                        category={category}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            :
              <Typography component="h3" variant="body1" sx={{ textAlign: "center" }}>
                <FormattedMessage
                  id="collections.noItems"
                />
              </Typography>
            }
          </>
        }

        {/* Stack List */}
        { type === 'stack' &&
          <Stack
            direction="row"
            spacing={2}
            pb={1}
          >
            { allCategories.map((category) => (
              <Box
                key={category.id}
                sx={{
                  position: 'relative',
                  width: 'max-content',
                  minWidth: {
                    xs: '26%',
                    sm_md: '22%',
                  },
                }}

              >
                <CategoryItem
                  category={category}
                />
              </Box>
            ))}
            <Box pl={1} sx={{ width: { xs: '250px', sm_md: '350px' } }} />
          </Stack>
        }

        {/* Pagination */}
        { type === 'collectionsPage' &&
          <>
            <Box mt={allCategories.length > 0 ? 3 : 5} />
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onChangePage={handleChangePage}
            />
          </>
        }
      </Box>
    </Container>
  );
};

export default CategoryList;
