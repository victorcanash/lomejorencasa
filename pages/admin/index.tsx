import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { AdminSections } from '@core/constants/admin';
import usePage from '@lib/hooks/usePage';
import HomeSection from '@components/admin/HomeSection';
import CheckPCategoriesSection from '@components/admin/CheckPCategoriesSection';
import CheckProductsSection from '@components/admin/CheckProductsSection';
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
              section == AdminSections.checkProductCategories &&
              <CheckPCategoriesSection 
                setSection={setSection}
              />
            }
            {
              section == AdminSections.checkProducts &&
              <CheckProductsSection 
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
