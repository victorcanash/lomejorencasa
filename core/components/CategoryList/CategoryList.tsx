import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack'; 
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { convertElementToSx } from '@core/utils/themes';
import { useProductsContext } from '@core/contexts/ProductsContext';
import CustomImage from '@core/components/multimedia/CustomImage';
import { themeCustomElements } from '@lib/config/theme/elements';

const CategoryList = () => {
  const {
    getAllCategories,
    getItemImgUrl,
  } = useProductsContext();

  return (
    <Container
      sx={{
        mt: 6,
        overflowX: 'auto',
      }}
    >
      <Stack
        direction="row"
        spacing={2}
      >
        { getAllCategories().map((category) => (
          <Box
            key={category.id}
            sx={{
              position: 'relative',
              width: 'max-content',
              minWidth: {
                xs: '26%',
                md: '20%',
                md_lg: '200px',
              },
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                paddingTop: '100%',
              }}
            >
              <Avatar
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <CustomImage
                  alt={category.name.current}
                  src={getItemImgUrl(category)}          
                  layout="fill" 
                />
              </Avatar>
            </Box>
            <Typography
              component="div"
              variant="body1Head"
              m="auto"
              mt={1}
              sx={{
                ...themeCustomElements.categoryList?.nameText?
                  convertElementToSx(themeCustomElements.categoryList.nameText) : undefined,
                wordWrap: 'break-word',
              }}
            >
              { category.name.current }
            </Typography>
          </Box>
        ))}
        <Box sx={{ width: '250px' }} />
      </Stack>
    </Container>
  );
};

export default CategoryList;
