import { Dispatch, SetStateAction } from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import { AdminSections } from '@core/constants/admin';
import LinkButton from '@core/components/LinkButton';
import { useSearchContext } from '@lib/contexts/SearchContext';

type HomeSectionProps = {
  setSection: Dispatch<SetStateAction<AdminSections>>,
};

const HomeSection = (props: HomeSectionProps) => {
  const { setSection } = props;

  const { getHref } = useSearchContext();

  const handleClickNewPCategoryBtn = () => {
    setSection(AdminSections.createProductCategory);
  }

  const handleClickNewProductBtn = () => {
    setSection(AdminSections.createProduct);
  }

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to the admin page
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Box maxWidth="sm">

        <Box sx={{ m: 2 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Check
          </Typography>
          <LinkButton 
            href={getHref()}
            sx={{ m: 2 }}
          >
            Check all products
          </LinkButton>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ m: 2 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Create
          </Typography>
          <Button
            variant="contained"
            sx={{ m: 2 }}
            onClick={handleClickNewPCategoryBtn}
          >
            Add new product category
          </Button>
          <Button
            variant="contained"
            sx={{ m: 2 }}
            onClick={handleClickNewProductBtn}
          >
            Add new product
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default HomeSection;
