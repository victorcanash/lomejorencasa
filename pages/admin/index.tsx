import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import { ManageActions } from '@core/constants/auth';
import LinkButton from '@core/components/LinkButton';
import { useSearchContext } from '@lib/contexts/SearchContext';
import usePage from '@lib/hooks/usePage';
import ManagePCategoryForm from '@components/forms/products/ManagePCategoryForm';
import ManageProductForm from '@components/forms/products/ManageProductForm';

const Admin: NextPage = () => {
  const { getHref } = useSearchContext();

  const page = usePage();

  const [openPCategoryForm, setOpenPCategoryForm] = useState(false);
  const [openProductForm, setOpenProductForm] = useState(false);

  const handleOpenPCategoryForm = () => {
    setOpenPCategoryForm(true);
    setOpenProductForm(false);
  }

  const handleOpenProductForm = () => {
    setOpenPCategoryForm(false);
    setOpenProductForm(true);
  }

  const handleCloseForm = () => {
    setOpenPCategoryForm(false);
    setOpenProductForm(false);
  }

  const handleClickBackBtn = () => {
    handleCloseForm();
  }

  const handleClickNewPCategoryBtn = () => {
    handleOpenPCategoryForm();
  }

  const handleClickNewProductBtn = () => {
    handleOpenProductForm();
  }

  return (
    <>
      <Head>
        <title>Admin</title>
        <meta name="description" content="Admin page" />
      </Head>

      {
        page.checked &&
          <>
            {
              !openPCategoryForm && !openProductForm &&
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
            }

            {
              (openPCategoryForm || openProductForm) &&
                <>
                  
                  <Button
                    variant="contained"
                    onClick={handleClickBackBtn}
                  >
                    Go back
                  </Button>
                  
                  <Divider sx={{ my: 2 }} />
                </>
            }

            {
              openPCategoryForm &&
                <ManagePCategoryForm
                  action={ManageActions.create}
                />
            } 
            {
              openProductForm &&
                <ManageProductForm 
                  action={ManageActions.create}
                />
            } 
          </>
      }
    </>
  );
};

export default Admin;
