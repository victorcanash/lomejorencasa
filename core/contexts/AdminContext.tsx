import {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

import { ManageActions } from '@core/constants/app';
import { AdminSections } from '@core/constants/admin';
import type { CheckCategory, CheckCategoryGroup } from '@core/types/admin';
import type {
  Landing,
  ManageProductCategory,
  Product,
  ProductCategory,
  ProductCategoryGroup,
  ProductPack,
} from '@core/types/products';
import { getAllProductCategories } from '@core/utils/products';

type ContextType = {
  section: AdminSections | undefined,
  setSection: Dispatch<SetStateAction<AdminSections | undefined>>,
  checkCategoryGroups: CheckCategoryGroup[],
  checkCategoriesWithoutGroup: CheckCategory[],
  checkCategories: CheckCategory[],
  getLandingsByCategorySlug: (slug: string) => Landing[],
  onGetCategoryDetails: (landings: Landing[], categorySlug: string) => void,
  onManageProductCategory: (action: ManageActions, productCategory: ProductCategory | ProductCategoryGroup | ManageProductCategory) => void,
  onManageLanding: (action: ManageActions, landing: Landing) => void,
  onManageProduct: (action: ManageActions, landing: Landing, product: Product) => void,
  onManageProductPack: (action: ManageActions, landing: Landing, pack: ProductPack) => void,
};

export const AdminContext = createContext<ContextType>({
  section: undefined,
  setSection: () => {},
  checkCategoryGroups: [],
  checkCategoriesWithoutGroup: [],
  checkCategories: [],
  getLandingsByCategorySlug: () => [],
  onGetCategoryDetails: () => {},
  onManageProductCategory: () => {},
  onManageLanding: () => {},
  onManageProduct: () => {},
  onManageProductPack: () => {},
});

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('Error while reading AdminContext');
  }
  return context;
};

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [section, setSection] = useState<AdminSections | undefined>(undefined);
  const [checkCategoryGroups, setCheckCategoryGroups] = useState<CheckCategoryGroup[]>([]);
  const [checkCategoriesWithoutGroup, setCheckCategoriesWithoutGroup] = useState<CheckCategory[]>([]);

  const firstRenderRef = useRef(false);

  const checkCategories = useMemo(() => {
    const newCheckCategories: CheckCategory[] = [];
    checkCategoryGroups.forEach((checkCategoryGroup) => {
      checkCategoryGroup.checkCategories.forEach((checkCategory) => {
        newCheckCategories.push(checkCategory);
      })
    });
    checkCategoriesWithoutGroup.forEach((checkCategory) => {
      newCheckCategories.push(checkCategory);
    });
    return newCheckCategories;
  }, [checkCategoriesWithoutGroup, checkCategoryGroups]);

  const getLandingsByCategorySlug = useCallback((slug: string) => {
    let landings: Landing[] = [];
    checkCategories.forEach((checkCategory) => {
      if (checkCategory.category.slug === slug && checkCategory.landings.length > 0) {
        landings = checkCategory.landings;
      }
    });
    return landings;
  }, [checkCategories]);

  const onGetCategoryDetails = (landings: Landing[], categorySlug: string) => {
    const newCategoryGroups = checkCategoryGroups.map((checkCategoryGroup) => {
      return {
        ...checkCategoryGroup,
        checkCategories: checkCategoryGroup.checkCategories.map((checkCategory) => {
          if (checkCategory.category.slug === categorySlug) {
            return {
              ...checkCategory,
              landings: landings,
            }
          } else {
            return checkCategory;
          }
        }),
      }
    })
    const newCategoriesWithoutGroup = checkCategoriesWithoutGroup.map((checkCategory) => {
      if (checkCategory.category.slug === categorySlug) {
        return {
          ...checkCategory,
          landings: landings,
        }
      } else {
        return checkCategory;
      }
    })
    setCheckCategoryGroups(newCategoryGroups);
    setCheckCategoriesWithoutGroup(newCategoriesWithoutGroup);
  };

  const onManageProductCategory = (action: ManageActions, productCategory: ProductCategory | ProductCategoryGroup | ManageProductCategory) => {
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
                    landings: [],
                  },
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
  };

  const onManageLanding = (action: ManageActions, landing: Landing) => {
    const categoriesIds: number[] = [];
    landing.products.forEach((product) => {
      product.categories?.forEach((category) => {
        categoriesIds.push(category.id);
      });
    });
    landing.packs.forEach((pack) => {
      pack.inventories.forEach((inventory) => {
        inventory.product.categories?.forEach((category) => {
          categoriesIds.push(category.id);
        });
      });
    });

    switch (action) {
      case ManageActions.create:
        const newCreateCategoryGroups = checkCategoryGroups.map((checkCategoryGroup) => {
          return {
            ...checkCategoryGroup,
            checkCategories: checkCategoryGroup.checkCategories.map((checkCategory) => {
              let existsCategory = false;
              categoriesIds.forEach((categoryId) => {
                if (checkCategory.category.id === categoryId) {
                  existsCategory = true;
                }
              });
              return {
                ...checkCategory,
                landings: existsCategory ?
                  [
                    ...checkCategory.landings,
                    landing,
                  ] : checkCategory.landings,
              };
            }),
          };
        });
        const newCreateCategoriesWithoutGroup = checkCategoriesWithoutGroup.map((checkCategory) => {
          let existsCategory = false;
          categoriesIds.forEach((categoryId) => {
            if (checkCategory.category.id === categoryId) {
              existsCategory = true;
            }
          });
          return {
            ...checkCategory,
            landings: existsCategory ?
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
              let existsCategory = false;
              categoriesIds.forEach((categoryId) => {
                if (checkCategory.category.id === categoryId) {
                  existsCategory = true;
                }
              });
              return {
                ...checkCategory,
                landings: existsCategory ?
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
          let existsCategory = false;
          categoriesIds.forEach((categoryId) => {
            if (checkCategory.category.id === categoryId) {
              existsCategory = true;
            }
          });
          return {
            ...checkCategory,
            landings: existsCategory ?
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
              let existsCategory = false;
              categoriesIds.forEach((categoryId) => {
                if (checkCategory.category.id === categoryId) {
                  existsCategory = true;
                }
              });
              return {
                ...checkCategory,
                landings: existsCategory ?
                  checkCategory.landings.filter((landingItem) => landingItem.id !== landing.id) : checkCategory.landings,
              };
            }),
          };
        });
        const newDeleteCategoriesWithoutGroup = checkCategoriesWithoutGroup.map((checkCategory) => {
          let existsCategory = false;
          categoriesIds.forEach((categoryId) => {
            if (checkCategory.category.id === categoryId) {
              existsCategory = true;
            }
          });
          return {
            ...checkCategory,
            landings: existsCategory ?
              checkCategory.landings.filter((landingItem) => landingItem.id !== landing.id) : checkCategory.landings,
          };
        });
        setCheckCategoryGroups(newDeleteCategoryGroups);
        setCheckCategoriesWithoutGroup(newDeleteCategoriesWithoutGroup);
        break;
    }
  };

  const onManageProduct = (action: ManageActions, landing: Landing, product: Product) => {
    let landingProducts = landing.products;
    switch (action) {
      case ManageActions.create:
        landingProducts.push(product);
        break;
      case ManageActions.update:
        landingProducts = landingProducts.map((landingProduct) => {
          if (landingProduct.id === product.id) {
            return product;
          }
          return landingProduct;
        });
        break;
      case ManageActions.delete:
        landingProducts = landingProducts.filter(landingProduct => landingProduct.id !== product.id);
        break;
    };
    onManageLanding(
      ManageActions.update,
      {
        ...landing,
        products: landingProducts,
      }
    );
  };

  const onManageProductPack = (action: ManageActions, landing: Landing, pack: ProductPack) => {
    let landingPacks = landing.packs;
    switch (action) {
      case ManageActions.create:
        landingPacks.push(pack);
        break;
      case ManageActions.update:
        landingPacks = landingPacks.map((landingPack) => {
          if (landingPack.id === pack.id) {
            return pack;
          }
          return landingPack;
        });
        break;
      case ManageActions.delete:
        landingPacks = landingPacks.filter(landingPack => landingPack.id !== pack.id);
        break;
    };
    onManageLanding(
      ManageActions.update,
      {
        ...landing,
        packs: landingPacks,
      }
    );
  };

  const getCategories = useCallback(async () => {
    await getAllProductCategories(true, true)
      .then((response) => {
        setCheckCategoryGroups(response.productCategories.map((categoryGroupResponse) => {
          const categoryGroup = categoryGroupResponse as ProductCategoryGroup;
          return {
            categoryGroup: categoryGroup,
            checkCategories: categoryGroup.categories ? categoryGroup.categories.map((category) => {
              return {
                category: category,
                landings: [],
              };
            }) : [],
          };
        }));
        setCheckCategoriesWithoutGroup(response.categoriesWithoutGroup ? response.categoriesWithoutGroup.map((categoryWithoutGroup) => {
          return {
            category: categoryWithoutGroup,
            landings: [],
          }
        }) : []);
      })
      .catch((error) => {
        enqueueSnackbar(
          error.message,
          { variant: 'error' }
        );
      });
  }, [enqueueSnackbar, setCheckCategoriesWithoutGroup, setCheckCategoryGroups]);

  useEffect(() => {
    let sectionSearch = AdminSections.home;
    if (typeof router.query.section == 'string') {
      switch (router.query.section) {
        case AdminSections.checkStore.toString():
          sectionSearch = AdminSections.checkStore;
          break;
        case AdminSections.createFailedOrder.toString():
          sectionSearch = AdminSections.createFailedOrder;
          break;
        case AdminSections.sendOrderEmail.toString():
          sectionSearch = AdminSections.sendOrderEmail;
          break;
        case AdminSections.sendFailedOrderEmail.toString():
          sectionSearch = AdminSections.sendFailedOrderEmail;
          break;
      }
    }
    setSection(sectionSearch);
  }, [router.query.section, setSection]);

  useEffect(() => {
    if (!firstRenderRef.current && section === AdminSections.checkStore) {
      firstRenderRef.current = true;
      getCategories();
    }
  }, [getCategories, section]);

  return (
    <AdminContext.Provider
      value={{
        section,
        setSection,
        checkCategoryGroups,
        checkCategoriesWithoutGroup,
        checkCategories,
        getLandingsByCategorySlug,
        onGetCategoryDetails,
        onManageProductCategory,
        onManageLanding,
        onManageProduct,
        onManageProductPack,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
