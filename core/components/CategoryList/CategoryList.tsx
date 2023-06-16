import { useState, useMemo, useCallback, ChangeEvent } from 'react';

import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Masonry from '@mui/lab/Masonry';
import Stack from '@mui/material/Stack'; 

import type { ProductCategory, ProductCategoryGroup } from '@core/types/products';
import { scrollToSection } from '@core/utils/navigation';
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

  const [currentPage, setCurrentPage] = useState(1);

  const limitByPage = useMemo(() => {
    return 40;
  }, []);

  const allCategories = useMemo(() => {
    return categories.slice((currentPage - 1) * limitByPage, currentPage * limitByPage);
  }, [currentPage, categories, limitByPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(allCategories.length / limitByPage);
  }, [allCategories.length, limitByPage]);

  const handleChangePage = useCallback((_event: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    setTimeout(() => {
      scrollToSection('landings', false);
    });
  }, []);

  return (
    <Container
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
              <Masonry columns={{ xs: 2, xs_sm: 3, sm: 4, md: 5 }} spacing={0}>
                { allCategories.map((category) => (
                  <Box
                    key={category.id}
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
                  </Box>
                ))}
              </Masonry>
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
