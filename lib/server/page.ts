import type { GetServerSideProps } from 'next';

import type { User } from '@core/types/auth';
import type { ProductCategory } from '@core/types/products';
import { getCredentials } from '@core/utils/auth';
import { getAllProductCategories } from '@core/utils/products';

export interface PageProps {
  token: string;
  user?: User | null;
  categories: ProductCategory[];
}

export const getPageProps: GetServerSideProps = async (context) => {
  const { req, res } = context;

  let result: { props: PageProps } | { notFound: boolean } = { props: {} as PageProps };
  let props: PageProps = { token: '', user: null, categories: [] }

  await getCredentials({ req, res }).then((response: {token: string, user: User }) => {
    props.token = response.token;
    props.user = response.user;
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
}
