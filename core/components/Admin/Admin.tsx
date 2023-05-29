import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { AdminSections } from '@core/constants/admin';
import Divider from '@core/components/ui/Divider';

import useAdmin from '@lib/hooks/useAdmin';
import BackBtn from '@core/components/ui/BackBtn';
import HomeSection from '@core/components/Admin/sections/HomeSection';
import CheckCategoriesSection from '@core/components/Admin/sections/CheckCategoriesSection';
import CheckProductsSection from '@core/components/Admin/sections/CheckProductsSection';
import CheckPacksSection from '@core/components/Admin/sections/CheckPacksSection';
import CreateCategorySection from '@core/components/Admin/sections/CreateCategorySection';
import CreateProductSection from '@core/components/Admin/sections/CreateProductSection';
import CreatePackSection from '@core/components/Admin/sections/CreatePackSection';
import CreateFailedOrderSection from '@core/components/Admin/sections/CreateFailedOrderSection';
import SendFailedOrderEmailSection from '@core/components/Admin/sections/SendFailedOrderEmailSection';
import SendOrderEmailSection from '@core/components/Admin/sections/SendOrderEmailSection';

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
