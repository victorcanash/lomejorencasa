import { useState } from 'react';

import { useIntl } from 'react-intl';
import { useSnackbar } from 'notistack';

import { ManageActions } from '@core/constants/app';
import type { 
  Product,
  ProductCategory,
  ProductInventory,
  ProductDiscount,
  ProductPack,
  ManageProductCategory,
  ProductCategoryGroup,
  Landing,
} from '@core/types/products';
import {
  getProductCategory,
  manageProductCategory as manageProductCategoryMW,
  manageLanding as manageLandingMW, 
  manageProduct as manageProductMW,
  manageProductInventory as manageProductInventoryMW,
  manageProductDiscount as manageProductDiscountMW,
  manageProductPack as manageProductPackMW,
} from '@core/utils/products';

import { useAppContext } from '@core/contexts/AppContext';
import { useAuthContext } from '@core/contexts/AuthContext';
import { useAdminContext } from '@core/contexts/AdminContext';
import { CheckCategory } from '@core/types/admin';

const useProducts = () => {
  const { setLoading } = useAppContext();
  const { token } = useAuthContext();
  const {
    checkCategoryGroups,
    setCheckCategoryGroups,
    checkCategoriesWithoutGroup,
    setCheckCategoriesWithoutGroup,
  } = useAdminContext();

  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  /* Admin */

  const getCategoryDetails = async (slug: string) => {
    return new Promise<{
      landings: Landing[],
    }>(async (resolve, reject) => {
      setLoading(true);
      let landings: Landing[] = [];
      checkCategoryGroups.forEach((checkCategoryGroup) => {
        checkCategoryGroup.checkCategories.forEach((checkCategory) => {
          if (checkCategory.category.slug === slug) {
            landings = checkCategory.landings;
          }
        });
      });
      checkCategoriesWithoutGroup.forEach((checkCategory) => {
        if (checkCategory.category.slug === slug && checkCategory.landings.length > 0) {
          landings = checkCategory.landings;
        }
      });
      if (landings.length > 0) {
        setLoading(false);
        resolve({
          landings: landings,
        });
        return;
      }
      await getProductCategory(slug, undefined, true)
        .then((response) => {
          const newCategoryGroups = checkCategoryGroups.map((checkCategoryGroup) => {
            return {
              ...checkCategoryGroup,
              checkCategories: checkCategoryGroup.checkCategories.map((checkCategory) => {
                if (checkCategory.category.slug === slug) {
                  return {
                    ...checkCategory,
                    landings: response.landingsResult.landings,
                  }
                } else {
                  return checkCategory;
                }
              }),
            }
          })
          const newCategoriesWithoutGroup = checkCategoriesWithoutGroup.map((checkCategory) => {
            if (checkCategory.category.slug === slug) {
              return {
                ...checkCategory,
                landings: response.landingsResult.landings,
              }
            } else {
              return checkCategory;
            }
          })
          setCheckCategoryGroups(newCategoryGroups);
          setCheckCategoriesWithoutGroup(newCategoriesWithoutGroup);
          landings = response.landingsResult.landings;
          setLoading(false);
          resolve({
            landings: landings,
          });
        })
        .catch((error) => {
          setLoading(false);
          enqueueSnackbar(
            error.message,
            { variant: 'error' }
          );
          reject(error);
        });
    });
  };

  const manageProductCategory = async (
    action: ManageActions,
    productCategory: ManageProductCategory,
    onSuccess?: (productCategory: ProductCategory | ProductCategoryGroup | ManageProductCategory) => void
  ) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    manageProductCategoryMW(action, token, intl.locale, productCategory)
      .then((response) => {
        onManagePCategorySuccess(action, response.productCategory || productCategory, onSuccess);
      }).catch((error: Error) => {
        setErrorMsg(error.message);
        setLoading(false);
      });
  };

  const onManagePCategorySuccess = (
    action: ManageActions,
    productCategory: ProductCategory | ProductCategoryGroup | ManageProductCategory,
    onSuccess?: (productCategory: ProductCategory | ProductCategoryGroup | ManageProductCategory) => void
  ) => {
    switch (action) {
      case ManageActions.create:
        if ((productCategory as ProductCategoryGroup)?.categories) {
          setCheckCategoryGroups([
            ...checkCategoryGroups,
            {
              categoryGroup: productCategory as ProductCategoryGroup,
              checkCategories: [],
            }
          ]);
        } else if ((productCategory as ProductCategory)?.categoryGroupId) {
          const newCategoryGroups = checkCategoryGroups.map((checkCategoryGroup) => {
            return {
              ...checkCategoryGroup,
              checkCategories: (checkCategoryGroup.categoryGroup.id === (productCategory as ProductCategory).categoryGroupId) ?
                [
                  ...checkCategoryGroup.checkCategories,
                  {
                    category: productCategory as ProductCategory,
                    landings: []
                  }
                ]
                :
                checkCategoryGroup.checkCategories,
            };
          })
          setCheckCategoryGroups(newCategoryGroups);
        } else {
          setCheckCategoriesWithoutGroup([
            ...checkCategoriesWithoutGroup,
            {
              category: productCategory as ProductCategory,
              landings: [],
            }
          ]);
        }
        break;
      case ManageActions.update:
        const newCategoryGroups = checkCategoryGroups.map((checkCategoryGroup) => {
          if (checkCategoryGroup.categoryGroup.slug === productCategory.slug) {
            return {
              ...checkCategoryGroup,
              categoryGroup: productCategory as ProductCategoryGroup,
            };
          }
          return {
            ...checkCategoryGroup,
            checkCategories: checkCategoryGroup.checkCategories.map((checkCategory) => {
              if (checkCategory.category.slug === productCategory.slug) {
                return {
                  ...checkCategory,
                  category: productCategory as ProductCategory,
                };
              } else {
                return checkCategory;
              }
            }),
          };
        })
        const newCategoriesWithoutGroup = checkCategoriesWithoutGroup.map((checkCategory) => {
          if (checkCategory.category.slug === productCategory.slug) {
            return {
              ...checkCategory,
              category: productCategory as ProductCategory,
            }
          } else {
            return checkCategory;
          }
        })
        setCheckCategoryGroups(newCategoryGroups);
        setCheckCategoriesWithoutGroup(newCategoriesWithoutGroup);
        break;
      case ManageActions.delete:
        if ((productCategory as ManageProductCategory)?.isCategoryGroup) {
          setCheckCategoryGroups(checkCategoryGroups.filter(checkCategoryGroup => checkCategoryGroup.categoryGroup.slug !== productCategory.slug));
        } else if ((productCategory as ManageProductCategory)?.categoryGroupId) {
          const newCategoryGroups = checkCategoryGroups.map((checkCategoryGroup) => {
            return {
              ...checkCategoryGroup,
              checkCategories: checkCategoryGroup.checkCategories.filter(checkCategory => checkCategory.category.slug !== productCategory.slug),
            };
          });
          setCheckCategoryGroups(newCategoryGroups);
        } else {
          setCheckCategoriesWithoutGroup(checkCategoriesWithoutGroup.filter(categoryWithoutGroup => categoryWithoutGroup.category.slug !== productCategory.slug));
        }
        break;
    }
    if (onSuccess) {
      onSuccess(productCategory);
    }
    setLoading(false);
    setSuccessMsg(intl.formatMessage({ id: 'admin.successes.updatePCategory' }));
  };

  const manageLanding = async (
    action: ManageActions,
    category: ProductCategory,
    landing: Landing,
    onSuccess?: (landing: Landing) => void
  ) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    manageLandingMW(action, token, intl.locale, landing)
      .then((response) => {
        onManageLandingSuccess(action, category, response.landing || landing, onSuccess);
      }).catch((error: Error) => {
        setErrorMsg(error.message);
        setLoading(false);
      });
  };

  const onManageLandingSuccess = (
    action: ManageActions,
    category: ProductCategory,
    landing: Landing,
    onSuccess?: (landing: Landing) => void
  ) => {
    switch (action) {
      case ManageActions.create:
        const newCreateCategoryGroups = checkCategoryGroups.map((checkCategoryGroup) => {
          return {
            ...checkCategoryGroup,
            checkCategories: checkCategoryGroup.checkCategories.map((checkCategory) => {
              return {
                ...checkCategory,
                landings: checkCategory.category.id === category.id ?
                  [
                    ...checkCategory.landings,
                    landing,
                  ] : checkCategory.landings,
              };
            }),
          };
        });
        const newCreateCategoriesWithoutGroup = checkCategoriesWithoutGroup.map((checkCategory) => {
          return {
            ...checkCategory,
            landings: checkCategory.category.id === category.id ?
              [
                ...checkCategory.landings,
                landing,
              ] : checkCategory.landings,
          };
        });
        setCheckCategoryGroups(newCreateCategoryGroups);
        setCheckCategoriesWithoutGroup(newCreateCategoriesWithoutGroup);
        break;
      case ManageActions.update:
        const newUpdateCategoryGroups = checkCategoryGroups.map((checkCategoryGroup) => {
          return {
            ...checkCategoryGroup,
            checkCategories: checkCategoryGroup.checkCategories.map((checkCategory) => {
              return {
                ...checkCategory,
                landings: checkCategory.category.id === category.id ?
                  checkCategory.landings.map((landingItem) => {
                    if (landingItem.id === landing.id) {
                      return {...landingItem, landing};
                    }
                    return landing;
                  }) : checkCategory.landings,
              };
            }),
          };
        });
        const newUpdateCategoriesWithoutGroup = checkCategoriesWithoutGroup.map((checkCategory) => {
          return {
            ...checkCategory,
            landings: checkCategory.category.id === category.id ?
              checkCategory.landings.map((landingItem) => {
                if (landingItem.id === landing.id) {
                  return {...landingItem, landing};
                }
                return landing;
              }) : checkCategory.landings,
          };
        });
        setCheckCategoryGroups(newUpdateCategoryGroups);
        setCheckCategoriesWithoutGroup(newUpdateCategoriesWithoutGroup);
        break;
      case ManageActions.delete:
        const newDeleteCategoryGroups = checkCategoryGroups.map((checkCategoryGroup) => {
          return {
            ...checkCategoryGroup,
            checkCategories: checkCategoryGroup.checkCategories.map((checkCategory) => {
              return {
                ...checkCategory,
                landings: checkCategory.category.id === category.id ?
                  checkCategory.landings.filter((landingItem) => landingItem.id !== landing.id) : checkCategory.landings,
              };
            }),
          };
        });
        const newDeleteCategoriesWithoutGroup = checkCategoriesWithoutGroup.map((checkCategory) => {
          return {
            ...checkCategory,
            landings: checkCategory.category.id === category.id ?
              checkCategory.landings.filter((landingItem) => landingItem.id !== landing.id) : checkCategory.landings,
          };
        });
        setCheckCategoryGroups(newDeleteCategoryGroups);
        setCheckCategoriesWithoutGroup(newDeleteCategoriesWithoutGroup);
        break;
    }
    if (onSuccess) {
      onSuccess(landing);
    }
    setLoading(false);
    setSuccessMsg(intl.formatMessage({ id: 'admin.successes.updateLanding' }));
  };

  const manageProduct = async (
    action: ManageActions,
    product: Product,
    onSuccess?: (product: Product) => void
  ) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    manageProductMW(action, token, intl.locale, product)
      .then((response) => {
        onManageProductSuccess(action, response.product || product, onSuccess);
      }).catch((error: Error) => {
        setErrorMsg(error.message);
        setLoading(false);
      });
  };

  const onManageProductSuccess = (
    action: ManageActions,
    product: Product,
    onSuccess?: (product: Product) => void
  ) => {
    if (onSuccess) {
      onSuccess(product);
    }
    setLoading(false);
    setSuccessMsg(intl.formatMessage({ id: 'admin.successes.updateProduct' }));
  };

  /*const createProduct = async (
    product: Product,
    inventories: ProductInventory[], 
    discounts: ProductDiscount[],
    onSuccess: () => void
  ) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    let productId = -1;

    try {
      productId = await (await manageProductMW(ManageActions.create, token, intl.locale, product)).product.id;
      
      for (const inventory of inventories) {
        inventory.productId = productId;
        await manageProductInventoryMW(ManageActions.create, token, intl.locale, inventory);
      }

      for (const discount of discounts) {
        discount.productId = productId;
        await manageProductDiscountMW(ManageActions.create, token, intl.locale, discount);
      }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (productId > -1) {
        product = { ...product, id: productId }
        await manageProductMW(ManageActions.delete, token, intl.locale, product);
      }
      setLoading(false);
      setErrorMsg(error.message);
      return;
    }

    setLoading(false);
    setSuccessMsg(intl.formatMessage({ id: 'admin.successes.createProduct' }));
    onSuccess();
  };

  const updateProduct = async (
    product: Product,
    onSuccess?: (product: Product) => void
  ) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    let productResponse;

    try {
      productResponse = await (await manageProductMW(ManageActions.update, token, intl.locale, product)).product;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    setSuccessMsg(intl.formatMessage({ id: 'admin.successes.updateProduct' }));
    if (onSuccess) {
      onSuccess(product);
    }
  };

const deleteProduct = async (
  product: Product, 
  onSuccess?: (product: Product) => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      await manageProductMW(ManageActions.delete, token, intl.locale, product);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    setSuccessMsg(intl.formatMessage({ id: 'admin.successes.deleteProduct' }));
    if (onSuccess) {
      onSuccess(product);
    }
  };*/

  const manageProductInventory = async (action: ManageActions, productInventory: ProductInventory, onSuccess?: (productInventory: ProductInventory) => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    manageProductInventoryMW(action, token, intl.locale, productInventory)
      .then((response: {productInventory: ProductInventory}) => {
        onManagePInventorySuccess(response.productInventory, onSuccess);
      }).catch((error: Error) => {
        setErrorMsg(error.message);
        setLoading(false);
      });
  };

  const onManagePInventorySuccess = (productInventory: ProductInventory, onSuccess?: (productInventory: ProductInventory) => void) => {
    setLoading(false);
    setSuccessMsg(intl.formatMessage({ id: 'admin.successes.updatePInventory' }));
    if (onSuccess) {
      onSuccess(productInventory);
    }
  };

  const manageProductDiscount = async (action: ManageActions, productDiscount: ProductDiscount, onSuccess?: (productDiscount: ProductDiscount) => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    manageProductDiscountMW(action, token, intl.locale, productDiscount)
      .then((response: {productDiscount: ProductDiscount}) => {
        onManagePDiscountSuccess(response.productDiscount, onSuccess);
      }).catch((error: Error) => {
        setErrorMsg(error.message);
        setLoading(false);
      });
  };

  const onManagePDiscountSuccess = (productDiscount: ProductDiscount, onSuccess?: (productDiscount: ProductDiscount) => void) => {
    setLoading(false);
    setSuccessMsg(intl.formatMessage({ id: 'admin.successes.updatePDiscount' }));
    if (onSuccess) {
      onSuccess(productDiscount);
    }
  };

  const manageProductPack = async (action: ManageActions, productPack: ProductPack, onSuccess?: (productPack: ProductPack) => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    manageProductPackMW(action, token, intl.locale, productPack)
      .then((response: {productPack: ProductPack}) => {
        onManagePPackSuccess(response.productPack, onSuccess);
      }).catch((error: Error) => {
        setErrorMsg(error.message);
        setLoading(false);
      });
  };

  const onManagePPackSuccess = (productPack: ProductPack, onSuccess?: (productPack: ProductPack) => void) => {
    setLoading(false);
    setSuccessMsg(intl.formatMessage({ id: 'admin.successes.updatePPack' }));
    if (onSuccess) {
      onSuccess(productPack);
    }
  };

  return {
    getCategoryDetails,
    manageProductCategory,
    manageLanding,
    manageProduct,
    manageProductInventory,
    manageProductDiscount,
    manageProductPack,
    errorMsg,
    successMsg,
  };
};

export default useProducts;
