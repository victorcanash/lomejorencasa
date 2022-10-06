import type { GetServerSideProps, GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { AdminSections } from '@core/constants/admin';
import type { Product, ProductCategory } from '@core/types/products';
import { getAllProducts } from '@core/utils/products';

export type AdminProps = {
  section: AdminSections,
  products: Product[],
  currentPage: number,
  totalPages: number, 
  productCategory: ProductCategory | null,
  keywords: string,
};

export const getAdminProps: GetServerSideProps = async (context) => {
  const { section } = context.query;
  let sectionSearch = AdminSections.home;
  if (typeof section == 'string') {
    switch (section) {
      case AdminSections.checkProductCategories.toString():
        sectionSearch = AdminSections.checkProductCategories;
        break;
      case AdminSections.checkProducts.toString():
        sectionSearch = AdminSections.checkProducts;
        return getCheckProductsProps(sectionSearch, context);
        break;
      case AdminSections.createProductCategory.toString():
        sectionSearch = AdminSections.createProductCategory;
        break;
      case AdminSections.createProduct.toString():
        sectionSearch = AdminSections.createProduct;
        break;
    }
  }
  return {
    props: {
      section: sectionSearch,   
    } as AdminProps,
  };
};

const getCheckProductsProps = async (section: AdminSections, context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
  const { category, page, sortBy, order, keywords } = context.query;
  const categorySearch = typeof category == 'string' ? category : 'all';
  const pageSearch = typeof page == 'string' && parseInt(page) > 0 ? parseInt(page) : 1;
  const sortBySearch = typeof sortBy == 'string' ? sortBy : 'id';
  const orderSearch = typeof order == 'string' ? order : 'asc';
  const keywordsSearch = typeof keywords == 'string' ? keywords : '';

  let result: { props: AdminProps } | { notFound: boolean } = { props: {} as AdminProps };
  
  await getAllProducts(pageSearch, sortBySearch, orderSearch, keywordsSearch, categorySearch, true)
    .then((response: { products: Product[], productCategory: ProductCategory | null, totalPages: number, currentPage: number }) => {
      result = {
        props: {
          section: section,
          products: response.products,
          productCategory: response.productCategory,
          currentPage: response.currentPage,
          totalPages: response.totalPages,
          keywords: keywordsSearch,
        }
      };
    })
    .catch((error: Error) => {
      result = { 
        notFound: true 
      };
    })

  return result;
};
