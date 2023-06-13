import { useState, useMemo, useCallback, ChangeEvent } from 'react';

import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';

import { scrollToSection } from '@core/utils/navigation';
import { useProductsContext } from '@core/contexts/ProductsContext';
import Title from '@core/components/ui/Title';
import Pagination from '@core/components/ui/Pagination';
import LandingItem from './LandingItem';

const LandingList = () => {
  const {
    getAllLandings,
  } = useProductsContext();

  const [currentPage, setCurrentPage] = useState(1);

  const limitByPage = useMemo(() => {
    return 40;
  }, []);

  const allLandings = useMemo(() => {
    scrollToSection('landings', false);
    return getAllLandings().slice((currentPage - 1) * limitByPage, currentPage * limitByPage);
  }, [currentPage, getAllLandings, limitByPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(allLandings.length / limitByPage);
  }, [allLandings.length, limitByPage]);

  const handleChangePage = useCallback((_event: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <Container id="landings">
      <Box 
        maxWidth="md"
        m="auto"
      >
        <Title
          type="h2"
          texts={{
            title: {
              id: 'productList.allCategories',
            },
          }}
          divider={true}
        />

        { allLandings.length > 0 ?
          <Masonry columns={{ xs: 2, sm_md: 3 }} spacing={0}>
            {allLandings.map((landing, index) => (
              <Box
                key={index}
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
          :
          <Typography component="h3" variant="body1" sx={{ textAlign: "center" }}>
            <FormattedMessage
              id="productList.noItems"
            />
          </Typography>
        }

        {/* Pagination */}
        <Box mt={allLandings.length > 0 ? 3 : 5} />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onChangePage={handleChangePage}
        />
      </Box>
    </Container>
  );
};

export default LandingList;
