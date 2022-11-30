import { useRouter } from 'next/router';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import { pages } from '@core/config/navigation.config';
import { AdminSections } from '@core/constants/admin';
import { useSearchContext } from '@lib/contexts/SearchContext';

const HomeSection = () => {
  const router = useRouter();

  const { productCategories } = useSearchContext();

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
            disabled={productCategories.length <= 0}
          >
            Add new product
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ m: 2 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Manage errors
          </Typography>
          <Button
            variant="contained"
            sx={{ m: 2 }}
            onClick={() => onClickSectionBtn(AdminSections.createFailedOrder)}
          >
            Create failed order
          </Button>
          <Button
            variant="contained"
            sx={{ m: 2 }}
            onClick={() => onClickSectionBtn(AdminSections.sendFailedOrderEmail)}
          >
            Send failed order email
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default HomeSection;
