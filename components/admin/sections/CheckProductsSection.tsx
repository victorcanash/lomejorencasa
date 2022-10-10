import { useState } from 'react';
import { useRouter } from 'next/router';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { ManageActions } from '@core/constants/auth';
import { allProductsName } from "@core/constants/products";
import { Product, ProductCategory, ProductInventory, ProductDiscount } from '@core/types/products';
import { CheckProduct, SelectedModel } from '@core/types/admin';
import { useSearchContext } from '@lib/contexts/SearchContext';
import useProducts from '@lib/hooks/useProducts';
import ManageProductForm from '@components/forms/products/ManageProductForm';
import ManagePInventoryForm from '@components/forms/products/ManagePInventoryForm';
import ManagePDiscountForm from '@components/forms/products/ManagePDiscountForm';
import ProductDetail from '@components/admin/details/ProductDetail';
import InventoryDetail from '@components/admin/details/InventoryDetail';
import DiscountDetail from '@components/admin/details/DiscountDetail';

export type CheckProductsSectionProps = {
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

  const { getAdminProduct } = useProducts();

  const [checkProducts, setCheckProducts] = useState(
    products.map((item) => {
      return {
        product: item,
        checkInventories: false,
        checkDiscounts: false,
      } as CheckProduct;
    })
  );
  const [selectedModel, setSelectedModel] = useState<SelectedModel>({
    product: undefined,
    inventory: undefined,
    discount: undefined,
  });

  const unselectModel = () => {
    setSelectedModel({
      product: undefined,
      inventory: undefined,
      discount: undefined,
    });
  };

  const anySelectedModel = () => {
    if (selectedModel.product || 
        (selectedModel.inventory && selectedModel.inventory != ManageActions.create) || 
        (selectedModel.discount && selectedModel.inventory != ManageActions.create)) {
      return true;
    }
    return false;
  };

  const refreshProduct = (productId: number) => {
    getAdminProduct(productId, onRefreshProductSuccess);
  };

  const onRefreshProductSuccess = (product: Product) => {
    setCheckProducts(
      checkProducts.map((item) => {
        if (item.product.id === product.id) {
          return {
            product: product,
            checkInventories: item.checkInventories,
            checkDiscounts: item.checkDiscounts,
          };
        } else {
          return item;
        }
      })
    );
    unselectModel();
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    router.push(getHref(category?.name || allProductsName, page, keywords));
  };

  const onClickUpdateProductBtn = (product: Product) => {
    setSelectedModel({
      product: product,
      inventory: undefined,
      discount: undefined,
    });
  };

  const onClickCreateInventoryBtn = (product: Product) => {
    setSelectedModel({
      product: product,
      inventory: ManageActions.create,
      discount: undefined,
    });
  }
  
  const onClickUpdateInventoryBtn = (product: Product, inventory: ProductInventory) => {
    if (product.inventories) {
      setSelectedModel({
        product: product,
        inventory: inventory,
        discount: undefined,
      });
    }
  };

  const onClickCreateDiscountBtn = (product: Product) => {
    setSelectedModel({
      product: product,
      inventory: undefined,
      discount: ManageActions.create,
    });
  }

  const onClickUpdateDiscountBtn = (product: Product, discount: ProductDiscount) => {
    if (product.discounts) {
      setSelectedModel({
        product: product,
        inventory: undefined,
        discount: discount,
      });
    }
  };

  const onSuccessUpdateProduct = (product: Product) => {
    refreshProduct(product.id);
  };

  const onSuccessDeleteProduct = () => {
    setCheckProducts(
      checkProducts.filter(item => item.product.id !== selectedModel.product?.id)
    );
    unselectModel();
  };

  const onSuccessCreateOrUpdateInventory = (inventory: ProductInventory) => {
    refreshProduct(inventory.productId);
  };

  const onSuccessCreateOrUpdateDiscount = (discount: ProductDiscount) => {
    refreshProduct(discount.productId);
  };

  const onSuccessDeleteInventory = () => {
    if (selectedModel.inventory && selectedModel.inventory != ManageActions.create){
      refreshProduct(selectedModel.inventory.productId);
    }
  };

  const onSuccessDeleteDiscount = () => {
    if (selectedModel.discount && selectedModel.discount != ManageActions.create) {
      refreshProduct(selectedModel.discount.productId);
    }
  };

  const onCancelModel = () => {
    unselectModel();
  }

  const onClickCheckDiscountsBtn = (product: Product) => {
    setCheckProducts(
      checkProducts.map((item) => {
        if (item.product.id === product.id) {
          return {
            product: item.product,
            checkInventories: item.checkInventories,
            checkDiscounts: !item.checkDiscounts,
          };
        } else {
          return item;
        }
      })
    );
  };

  const onClickCheckInventoriesBtn = (product: Product) => {
    setCheckProducts(
      checkProducts.map((item) => {
        if (item.product.id === product.id) {
          return {
            product: item.product,
            checkInventories: !item.checkInventories,
            checkDiscounts: item.checkDiscounts,
          };
        } else {
          return item;
        }
      })
    );
  };

  const getManageForm = () => {
    if (selectedModel.product) {
      if (!selectedModel.inventory && !selectedModel.discount) {
        return (
          <ManageProductForm 
            action={ManageActions.update}
            product={selectedModel.product}
            manageOnSubmit={true}
            onSubmitSuccess={onSuccessUpdateProduct}
            onDeleteSuccess={onSuccessDeleteProduct}
            onCancel={onCancelModel}
          />
        );
      } else if (selectedModel.inventory) {
        return (
          <ManagePInventoryForm 
            action={selectedModel.inventory == ManageActions.create ? ManageActions.create : ManageActions.update}
            product={selectedModel.product}
            productInventory={selectedModel.inventory == ManageActions.create ? undefined : selectedModel.inventory}
            manageOnSubmit={true}
            onSubmitSuccess={onSuccessCreateOrUpdateInventory}
            onDeleteSuccess={onSuccessDeleteInventory}
            onCancel={onCancelModel}
          />
        );
      } else if (selectedModel.discount) {
        return (
          <ManagePDiscountForm 
            action={selectedModel.discount == ManageActions.create ? ManageActions.create : ManageActions.update}
            product={selectedModel.product}
            productDiscount={selectedModel.discount == ManageActions.create ? undefined : selectedModel.discount}
            manageOnSubmit={true}
            onSubmitSuccess={onSuccessCreateOrUpdateDiscount}
            onDeleteSuccess={onSuccessDeleteDiscount}
            onCancel={onCancelModel}
          />
        );
      }
    }
    return (<></>);
  };

  return (
    <>           
      { !anySelectedModel() ?

        <>
          <Typography component="h1" variant="h5">
            Products
          </Typography>

          <Grid container spacing={4} py={3}>
            {checkProducts?.map((item, index) => (
              <Grid item xs={6} key={index}>
                <Typography component="div" variant="h6">
                  Product detail
                </Typography>
                <ProductDetail
                  product={item.product}
                  created={true}
                />   
                <Typography component="div" variant="subtitle1">
                  {`Active discount: ${item.product.activeDiscount ? '' : 'Null'}`}
                </Typography>
                { item.product.activeDiscount && 
                    <DiscountDetail
                      key="activeDiscount"
                      discount={item.product.activeDiscount}
                      created={true}
                    /> 
                }
                <div>
                  <Button 
                    variant="contained"  
                    startIcon={<UpdateIcon />}                    
                    onClick={() => onClickUpdateProductBtn(item.product)}
                  >
                    Update product
                  </Button> 
                </div>
                <div>
                  <Button 
                    variant="contained"  
                    startIcon={<AddIcon />}                    
                    onClick={() => onClickCreateDiscountBtn(item.product)}
                  >
                    Create discount
                  </Button> 
                </div>
                <div>  
                  <Button
                    variant="contained"
                    onClick={() => onClickCheckDiscountsBtn(item.product)}
                    startIcon={ !item.checkDiscounts ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                  >
                    Check all discounts
                  </Button>
                </div> 
                { item.checkDiscounts && item.product.discounts &&
                  <>
                    { item.product.discounts.map((discount, index) => (
                      <div key={`${index}${item.product.name}`}>
                        <DiscountDetail          
                          discount={discount}
                          created={true}
                        />
                        <Button 
                          variant="contained"  
                          startIcon={<UpdateIcon />}                    
                          onClick={() => onClickUpdateDiscountBtn(item.product, discount)}
                        >
                          Update discount
                        </Button>    
                      </div>
                    ))}
                  </>
                }
                <div>
                  <Button 
                    variant="contained"  
                    startIcon={<AddIcon />}                    
                    onClick={() => onClickCreateInventoryBtn(item.product)}
                  >
                    Create inventory
                  </Button>  
                </div>
                <div>
                  <Button
                    variant="contained"
                    onClick={() => onClickCheckInventoriesBtn(item.product)}
                    startIcon={ !item.checkInventories ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                  >
                    Check all inventories
                  </Button>
                </div>
                { item.checkInventories && item.product.inventories &&
                  <>
                    { item.product.inventories.map((inventory, index) => (
                      <div key={`${index}${item.product.name}`}>
                        <InventoryDetail
                          inventory={inventory}
                          created={true}
                        /> 
                        <Button 
                          variant="contained"  
                          startIcon={<UpdateIcon />}                    
                          onClick={() => onClickUpdateInventoryBtn(item.product, inventory)}
                        >
                          Update inventory
                        </Button> 
                      </div>
                    ))}
                  </>
                }
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

        getManageForm()

      }
    </>
  );
};

export default CheckProductsSection;
