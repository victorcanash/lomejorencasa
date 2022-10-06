import type { NextPage } from 'next';
import Head from 'next/head';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { AdminSections } from '@core/constants/admin';
import { AdminProps, getAdminProps } from '@lib/server/admin';
import usePage from '@lib/hooks/usePage';
import HomeSection from '@components/admin/sections/HomeSection';
import CheckCategoriesSection from '@components/admin/sections/CheckCategoriesSection';
import CheckProductsSection from '@components/admin/sections/CheckProductsSection';
import CreateCategorySection from '@components/admin/sections/CreateCategorySection';
import CreateProductSection from '@components/admin/sections/CreateProductSection';
import GoBackBtn from '@components/ui/GoBackBtn';

const Admin: NextPage<AdminProps> = (props) => {
  const { 
    section,
    products, 
    currentPage, 
    totalPages, 
    productCategory,  
    keywords, 
  } = props;

  const page = usePage();

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
              section == AdminSections.home ?
                <Typography variant="h4" component="h1" gutterBottom>
                  Welcome to the admin page
                </Typography>
                :
                <GoBackBtn />
            }

            <Divider sx={{ my: 3 }} />

            {
              section == AdminSections.home &&
                <HomeSection />
            }
            {
              section == AdminSections.checkProductCategories &&
                <CheckCategoriesSection />
            }
            {
              section == AdminSections.checkProducts &&
                <CheckProductsSection 
                  category={productCategory}
                  products={products}
                  totalPages={totalPages}
                  currentPage={currentPage}
                  keywords={keywords}
                />
            }
            {
              section == AdminSections.createProductCategory &&
                <CreateCategorySection />
            }
            {
              section == AdminSections.createProduct &&
                <CreateProductSection />
            }
          </>
      }
    </>
  );
};

export default Admin;

export const getServerSideProps = getAdminProps;
