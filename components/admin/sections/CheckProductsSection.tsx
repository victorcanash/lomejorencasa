import { useState } from 'react';
import { useRouter } from 'next/router';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import UpdateIcon from '@mui/icons-material/Update';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { ManageActions } from '@core/constants/auth';
import { allProductsName } from "@core/constants/products";
import { Product, ProductCategory, ProductInventory, ProductDiscount } from '@core/types/products';
import { useSearchContext } from '@lib/contexts/SearchContext';
import ManageProductForm from '@components/forms/products/ManageProductForm';
import ManagePInventoryForm from '@components/forms/products/ManagePInventoryForm';
import ManagePDiscountForm from '@components/forms/products/ManagePDiscountForm';
import ProductDetail from '@components/admin/details/ProductDetail';
import InventoryDetail from '@components/admin/details/InventoryDetail';
import DiscountDetail from '@components/admin/details/DiscountDetail';

type CheckProductsSectionProps = {
  category: ProductCategory | null,
  products: Product[],
  totalPages: number,
  currentPage: number,
  keywords: string,
};

const CheckProductsSection = (props: CheckProductsSectionProps) => {
  const { 
    category, 
    products, 
    totalPages, 
    currentPage, 
    keywords 
  } = props;

  const { getHref } = useSearchContext();

  const router = useRouter();

  const [selectedModel, setSelectedModel] = useState<Product | ProductInventory | ProductDiscount | undefined>(undefined);

  const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    router.push(getHref(category?.name || allProductsName, page, keywords));
  };

  const onClickUpdateProductBtn = (product: Product) => {
    setSelectedModel(product);
  };

  const onSuccessUpdateProduct = (product: Product) => {
    setSelectedModel(undefined);
  };

  const onSuccessDeleteProduct = () => {
    setSelectedModel(undefined);
  };

  const onClickCheckDiscountsBtn = () => {
   
  };

  const onClickCheckInventoriesBtn = () => {
    
  };

  return (
    <>           
      { !selectedModel ?

        <>
          <Typography component="h1" variant="h5">
            Products
          </Typography>

          <Grid container spacing={4} py={3}>
            {products?.map((item, index) => (
              <Grid item xs={6} key={index}>
                <ProductDetail
                  product={item}
                  created={true}
                />
                <Button 
                  variant="contained"  
                  startIcon={<UpdateIcon />}                    
                  onClick={() => onClickUpdateProductBtn(item)}
                >
                  Update
                </Button>    
                <Typography component="div" variant="subtitle1">
                  {`Active discount: ${item.activeDiscount ? '' : 'Null'}`}
                </Typography>
                { item.activeDiscount && 
                    <DiscountDetail
                      discount={item.activeDiscount}
                      created={true}
                    /> 
                }    
                <Button
                  variant="contained"
                  onClick={onClickCheckDiscountsBtn}
                  startIcon={<KeyboardArrowDownIcon />}
                >
                  Check all discounts
                </Button>
                <Button
                  variant="contained"
                  onClick={onClickCheckInventoriesBtn}
                  startIcon={<KeyboardArrowDownIcon />}
                >
                  Check all inventories
                </Button>
              </Grid>
            ))}
          </Grid>

          <Stack spacing={2} sx={{ mt: 1 }} >
            <Pagination
              sx={{
                display: "flex", flexDirection: "col", justifyContent: "center"
              }}
              count={totalPages}
              page={currentPage}
              onChange={handleChangePage}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </>

      :

        <>
          {selectedModel as Product !== null &&
            <ManageProductForm 
              action={ManageActions.update}
              product={selectedModel as Product}
              manageOnSubmit={true}
              onSubmitSuccess={onSuccessUpdateProduct}
              onDeleteSuccess={onSuccessDeleteProduct}
            />
          }
        </>

      }
    </>
  );
};

export default CheckProductsSection;
