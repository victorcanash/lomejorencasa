import { useRouter } from 'next/router';

import { FormattedMessage } from 'react-intl';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import { AdminSections } from '@core/constants/admin';

import { pages } from '@lib/constants/navigation';
import { useSearchContext } from '@lib/contexts/SearchContext';

const HomeSection = () => {
  const router = useRouter();

  const { productCategories } = useSearchContext();

  const onClickSectionBtn = (section: AdminSections) => {
    router.push(`${pages.admin.path}?section=${section}`);
  }

  return (
    <>
      <Box>

        <Box sx={{ m: 2 }}>
          <Typography variant="h1" component="h2" gutterBottom>
            <FormattedMessage
              id="admin.check"
            />
          </Typography>
          <Button
            variant="contained"
            sx={{ m: 2 }}
            onClick={() => onClickSectionBtn(AdminSections.checkProductCategories)}
          >
            <FormattedMessage
              id="admin.checkCategoriesBtn"
            />
          </Button>
          <Button 
            variant="contained"
            sx={{ m: 2 }}
            onClick={() => onClickSectionBtn(AdminSections.checkProducts)}
          >
            <FormattedMessage
              id="admin.checkProductsBtn"
            />
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ m: 2 }}>
          <Typography variant="h1" component="h2" gutterBottom>
            <FormattedMessage
              id="admin.create"
            />
          </Typography>
          <Button
            variant="contained"
            sx={{ m: 2 }}
            onClick={() => onClickSectionBtn(AdminSections.createProductCategory)}
          >
            <FormattedMessage
              id="admin.createCategoryBtn"
            />
          </Button>
          <Button
            variant="contained"
            sx={{ m: 2 }}
            onClick={() => onClickSectionBtn(AdminSections.createProduct)}
            disabled={productCategories.length <= 0}
          >
            <FormattedMessage
              id="admin.createProductBtn"
            />
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ m: 2 }}>
          <Typography variant="h1" component="h2" gutterBottom>
            <FormattedMessage
              id="admin.manageErrors"
            />
          </Typography>
          <Button
            variant="contained"
            sx={{ m: 2 }}
            onClick={() => onClickSectionBtn(AdminSections.createFailedOrder)}
          >
            <FormattedMessage
              id="admin.createFailedOrderBtn"
            />
          </Button>
          <Button
            variant="contained"
            sx={{ m: 2 }}
            onClick={() => onClickSectionBtn(AdminSections.sendFailedOrderEmail)}
          >
            <FormattedMessage
              id="admin.sendFailedOrderEmailBtn"
            />
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default HomeSection;
