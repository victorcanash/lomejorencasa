import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { AdminSections } from '@core/constants/admin';
import Divider from '@core/components/ui/Divider';

import useAdmin from '@lib/hooks/useAdmin';
import BackBtn from '@core/components/ui/BackBtn';
import HomeSection from '@components/admin/sections/HomeSection';
import CheckCategoriesSection from '@components/admin/sections/CheckCategoriesSection';
import CheckProductsSection from '@components/admin/sections/CheckProductsSection';
import CheckPacksSection from '@components/admin/sections/CheckPacksSection';
import CreateCategorySection from '@components/admin/sections/CreateCategorySection';
import CreateProductSection from '@components/admin/sections/CreateProductSection';
import CreatePackSection from '@components/admin/sections/CreatePackSection';
import CreateFailedOrderSection from '@components/admin/sections/CreateFailedOrderSection';
import SendFailedOrderEmailSection from '@components/admin/sections/SendFailedOrderEmailSection';
import SendOrderEmailSection from '@components/admin/sections/SendOrderEmailSection';

type AdminProps = {
  pageChecked: boolean,
};

const Admin = (props: AdminProps) => {
  const {
    pageChecked,
  } = props;

  const { section, checkProductsProps, checkPacksProps } = useAdmin(pageChecked);

  const getCurrentSection = () => {
    if (section == AdminSections.home) {
      return (<HomeSection />);
    } else if (section == AdminSections.checkProductCategories) {
      return (<CheckCategoriesSection />);
    } else if (section == AdminSections.checkProducts && checkProductsProps) { 
      return (
        <CheckProductsSection 
          category={checkProductsProps.category}
          products={checkProductsProps.products}
          totalPages={checkProductsProps.totalPages}
          currentPage={checkProductsProps.currentPage}
          keywords={checkProductsProps.keywords}
          getAdminProduct={checkProductsProps.getAdminProduct}
        />
      );
    } else if (section == AdminSections.checkProductPacks && checkPacksProps) { 
      return (
        <CheckPacksSection 
          packs={checkPacksProps.packs}
          totalPages={checkPacksProps.totalPages}
          currentPage={checkPacksProps.currentPage}
        />
      );
    } else if (section == AdminSections.createProductCategory) {
      return (<CreateCategorySection />);
    } else if (section == AdminSections.createProduct) {
      return (<CreateProductSection />);
    } else if (section == AdminSections.createProductPack) {
      return (<CreatePackSection />);
    } else if (section == AdminSections.createFailedOrder) {
      return (<CreateFailedOrderSection />);
    } else if (section == AdminSections.sendFailedOrderEmail) {
      return (<SendFailedOrderEmailSection />);
    } else if (section === AdminSections.sendOrderEmail) {
      return (<SendOrderEmailSection />);
    }
    return undefined;
  };

  return (
    <>
      { pageChecked && section &&
        <Container>
          { section == AdminSections.home ?
            <Typography component="h1" variant="h1">
              <FormattedMessage id="admin.h1" />
            </Typography>
            :
            <BackBtn />
          }
          <Divider mt={1} mb={4} />
          { getCurrentSection() }
        </Container>
      }
    </>
  );
};

export default Admin;
