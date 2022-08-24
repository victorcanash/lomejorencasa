import type { GetServerSideProps } from 'next';

import type { User } from '@core/types/auth';
import type { ProductCategory } from '@core/types/products';
import type { Cart } from '@core/types/cart';
import { getCredentials } from '@core/utils/auth';
import { getAllProductCategories } from '@core/utils/products';

export type PageProps = {
  token: string,
  user?: User | null,
  cart?: Cart | null,
  categories: ProductCategory[],
}

export const getPageProps: GetServerSideProps = async (context) => {
  let result: { props: PageProps } | { notFound: boolean } = { props: {} as PageProps };
  const props: PageProps = { token: '', user: null, categories: [] }

  await getCredentials().then((response: {token: string, user: User, cart: Cart }) => {
    props.token = response.token;
    props.user = response.user;
    props.cart = response.cart;
  }).catch((error: Error) => {
  }); 

  await getAllProductCategories().then((response: {productCategories: ProductCategory[]}) => {
    props.categories = response.productCategories;
    result = {
      props: props
    }
  }).catch((error: Error) => {
    result = {
      notFound: true
    };
  });

  return result;
};
