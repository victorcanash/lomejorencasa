import { useState, useMemo, useCallback, ChangeEvent } from 'react';

import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import Stack from '@mui/material/Stack';

import { scrollToSection } from '@core/utils/navigation';
import { useProductsContext } from '@core/contexts/ProductsContext';
import Title from '@core/components/ui/Title';
import Pagination from '@core/components/ui/Pagination';
import LandingItem from './LandingItem';

type LandingListProps = {
  type?: 'featured',
};

const LandingList = (props: LandingListProps) => {
  const {
    type,
  } = props;

  const {
    getAllLandings,
  } = useProductsContext();

  const [currentPage, setCurrentPage] = useState(1);

  const limitByPage = useMemo(() => {
    return 40;
  }, []);

  const allLandings = useMemo(() => {
    return getAllLandings().slice((currentPage - 1) * limitByPage, currentPage * limitByPage);
  }, [currentPage, getAllLandings, limitByPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(allLandings.length / limitByPage);
  }, [allLandings.length, limitByPage]);

  const isMasonryStyle = useMemo(() => {
    if (!type) {
      return true;
    }
    return false;
  }, [type]);

  const isStackStyle = useMemo(() => {
    if (type) {
      return true;
    }
    return false;
  }, [type]);

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
        mt: isMasonryStyle ? 6 : undefined,
        overflowX: isStackStyle ? 'auto' : undefined,
      }}
    >
      <Box 
        maxWidth="md"
        m="auto"
      >

        {/* Title */}
        { type === 'featured' &&
          <Title
            type="h2"
            texts={{
              title: {
                id: 'productList.featured.title',
              },
            }}
            divider={false}
          />
        }

        {/* List */}
        { allLandings.length > 0 ?
          <>

            {/* Masonry List */}
            { isMasonryStyle &&
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
            { isStackStyle &&
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
        { isMasonryStyle &&
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
