import type { NextPage } from 'next';

import { FormattedMessage } from 'react-intl';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { PageTypes } from '@core/constants/navigation';
import { AdminSections } from '@core/constants/admin';
import usePage from '@lib/hooks/usePage';
import useAdmin from '@lib/hooks/useAdmin';
import PageHeader from '@components/ui/PageHeader';
import GoBackBtn from '@components/ui/GoBackBtn';
import HomeSection from '@components/admin/sections/HomeSection';
import CheckCategoriesSection from '@components/admin/sections/CheckCategoriesSection';
import CheckProductsSection from '@components/admin/sections/CheckProductsSection';
import CreateCategorySection from '@components/admin/sections/CreateCategorySection';
import CreateProductSection from '@components/admin/sections/CreateProductSection';
import CreateFailedOrderSection from '@components/admin/sections/CreateFailedOrderSection';
import SendFailedOrderEmailSection from '@components/admin/sections/SendFailedOrderEmailSection';

const Admin: NextPage = () => {
  const page = usePage();
  const { section, checkProductsProps } = useAdmin(page.checked);

  return (
    <>
      <PageHeader
        pageType={PageTypes.admin}
        metas={{
          titleId: 'admin.metas.title',
          descriptionId: 'admin.metas.description',
        }}
      />

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

          <Divider sx={{ mt: 1, mb: 3 }} />

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
