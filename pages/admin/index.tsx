import type { NextPage } from 'next';
import Head from 'next/head';

import { FormattedMessage, useIntl } from 'react-intl';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { AdminSections } from '@core/constants/admin';
import usePage from '@lib/hooks/usePage';
import useAdmin from '@lib/hooks/useAdmin';
import HomeSection from '@components/admin/sections/HomeSection';
import CheckCategoriesSection from '@components/admin/sections/CheckCategoriesSection';
import CheckProductsSection from '@components/admin/sections/CheckProductsSection';
import CreateCategorySection from '@components/admin/sections/CreateCategorySection';
import CreateProductSection from '@components/admin/sections/CreateProductSection';
import CreateFailedOrderSection from '@components/admin/sections/CreateFailedOrderSection';
import SendFailedOrderEmailSection from '@components/admin/sections/SendFailedOrderEmailSection';
import GoBackBtn from '@components/ui/GoBackBtn';

const Admin: NextPage = () => {
  const intl = useIntl();

  const page = usePage();
  const { section, checkProductsProps } = useAdmin(page.checked);
  
  const title = intl.formatMessage({ id: 'admin.metas.title' });
  const description = intl.formatMessage({ id: 'admin.metas.description' });

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      { page.checked && section &&
        <>
          {
            section == AdminSections.home ?
              <Typography variant="h1" component="h1" gutterBottom>
                <FormattedMessage id="admin.h1" />
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
            section == AdminSections.checkProducts && checkProductsProps && 
              <CheckProductsSection 
                category={checkProductsProps.category}
                products={checkProductsProps.products}
                totalPages={checkProductsProps.totalPages}
                currentPage={checkProductsProps.currentPage}
                keywords={checkProductsProps.keywords}
                getAdminProduct={checkProductsProps.getAdminProduct}
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
          {
            section == AdminSections.createFailedOrder &&
              <CreateFailedOrderSection />
          }
          {
            section == AdminSections.sendFailedOrderEmail &&
              <SendFailedOrderEmailSection />
          }
        </>
      }
    </>
  );
};

export default Admin;
