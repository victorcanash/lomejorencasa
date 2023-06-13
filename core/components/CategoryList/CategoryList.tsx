import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack'; 

import { useProductsContext } from '@core/contexts/ProductsContext';
import CategoryItem from './CategoryItem';

const CategoryList = () => {
  const {
    getAllCategories,
  } = useProductsContext();

  return (
    <Container
      sx={{
        mt: 6,
        overflowX: 'auto',
      }}
    >
      <Box 
        maxWidth="md"
        m="auto"
      >
        <Stack
          direction="row"
          spacing={2}
          pb={1}
        >
          { getAllCategories().map((category) => (
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
      </Box>
    </Container>
  );
};

export default CategoryList;
