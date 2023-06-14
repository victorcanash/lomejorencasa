import { useState, useMemo, useCallback, ChangeEvent } from 'react';

import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import Stack from '@mui/material/Stack';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import type { FormatText } from '@core/types/texts';
import type { CategoryConfig, ProductCategory } from '@core/types/products';
import { scrollToSection } from '@core/utils/navigation';
import { useProductsContext } from '@core/contexts/ProductsContext';
import Link from '@core/components/navigation/Link';
import Title from '@core/components/ui/Title';
import Pagination from '@core/components/ui/Pagination';
import LandingItem from './LandingItem';

import { pages } from '@lib/config/navigation.config';

type LandingListProps = {
  type: 'collectionsPage' | 'stack',
  categoryModel?: ProductCategory,
  categoryConfig?: CategoryConfig,
  title?: FormatText,
};

const LandingList = (props: LandingListProps) => {
  const {
    type,
    categoryModel,
    categoryConfig,
    title,
  } = props;

  const {
    getAllLandings,
  } = useProductsContext();

  const [currentPage, setCurrentPage] = useState(1);

  const limitByPage = useMemo(() => {
    return 40;
  }, []);

  const landingsByCategory = useMemo(() => {
    return getAllLandings().filter((landing) => {
      let fromCategory = categoryModel ? false : true;
      if (categoryModel) {
        if (landing.products && landing.products.length > 0) {
          landing.products.forEach((product) => {
            if (product.categoryId === categoryModel.id) {
              fromCategory = true;
              return;
            }
          });
        } else if (landing.packs && landing.packs.length > 0) {
          landing.packs.forEach((pack) => {
            if (fromCategory) {
              return;
            }
            if (pack.inventories && pack.inventories.length > 0) {
              pack.inventories.forEach((inventory) => {
                if (inventory.product?.categoryId === categoryModel.id) {
                  fromCategory = true;
                  return;
                }
              })
            }
          });
        }
      }
      return fromCategory;
    })
  }, [categoryModel, getAllLandings]);

  const allLandings = useMemo(() => {
    return landingsByCategory.slice((currentPage - 1) * limitByPage, currentPage * limitByPage);
  }, [currentPage, landingsByCategory, limitByPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(allLandings.length / limitByPage);
  }, [allLandings.length, limitByPage]);

  const handleChangePage = useCallback((_event: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    setTimeout(() => {
      scrollToSection('landings', false);
    });
  }, []);

  return (
    <Container
      id="landings"
      sx={{
        overflowX: type === 'stack' ? 'auto' : undefined,
      }}
    >
      <Box 
        maxWidth="md"
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
                href={pages.collections.index.path}
              >
                <FormattedMessage
                  id="productList.collections"
                />
              </Link>
            </Breadcrumbs>
          </>
        }
        <Title
          type={type === 'collectionsPage' ? 'h1' : 'h2'}
          noMarginTop={type === 'collectionsPage' ? true : false}
          texts={{
            title: (!categoryModel && !title) ? {
              id: 'productList.all.title',
            } : title,
            titleAdd: (categoryModel && !title) ?
              categoryModel.name.current : undefined,
          }}
          divider={type === 'collectionsPage' ? true : false}
        />

        {/* List */}
        { allLandings.length > 0 ?
          <>

            {/* Masonry List */}
            { type === 'collectionsPage' &&
              <Masonry columns={{ xs: 2, sm_md: 3 }} spacing={0}>
                { allLandings.map((landing) => (
                  <Box
                    key={landing.id}
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
                      <LandingItem
                        landing={landing}
                      />
                    </Box>
                  </Box>
                ))}
              </Masonry>
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
                        sm_md: '30%',
                      },
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
          :
          <Typography component="h3" variant="body1" sx={{ textAlign: "center" }}>
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
  );
};

export default LandingList;
