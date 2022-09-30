import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import { AdminSections } from '@core/constants/admin';
import usePage from '@lib/hooks/usePage';
import HomeSection from '@components/admin/HomeSection';
import CreatePCategorySection from '@components/admin/CreatePCategorySection';
import CreateProductSection from '@components/admin/CreateProductSection';

const Admin: NextPage = () => {
  const page = usePage();

  const [section, setSection] = useState(AdminSections.home);

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
              section == AdminSections.home &&
                <HomeSection 
                  setSection={setSection}
                />
            }
            {
              section == AdminSections.createProductCategory &&
              <CreatePCategorySection 
                setSection={setSection}
              />
            }
            {
              section == AdminSections.createProduct &&
              <CreateProductSection 
                setSection={setSection}
              />
            }
          </>
      }
    </>
  );
};

export default Admin;
