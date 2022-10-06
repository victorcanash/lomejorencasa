import { useRouter } from 'next/router';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import { pages } from '@core/config/navigation.config';
import { AdminSections } from '@core/constants/admin';

const HomeSection = () => {
  const router = useRouter();

  const onClickSectionBtn = (section: AdminSections) => {
    router.push(`${pages.admin.path}?section=${section}`);
  }

  return (
    <>
      <Box maxWidth="sm">

        <Box sx={{ m: 2 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Check
          </Typography>
          <Button
            variant="contained"
            sx={{ m: 2 }}
            onClick={() => onClickSectionBtn(AdminSections.checkProductCategories)}
          >
            Check all product categories
          </Button>
          <Button 
            variant="contained"
            sx={{ m: 2 }}
            onClick={() => onClickSectionBtn(AdminSections.checkProducts)}
          >
            Check all products
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ m: 2 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Create
          </Typography>
          <Button
            variant="contained"
            sx={{ m: 2 }}
            onClick={() => onClickSectionBtn(AdminSections.createProductCategory)}
          >
            Add new product category
          </Button>
          <Button
            variant="contained"
            sx={{ m: 2 }}
            onClick={() => onClickSectionBtn(AdminSections.createProduct)}
          >
            Add new product
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default HomeSection;
