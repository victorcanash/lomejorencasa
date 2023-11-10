import type { NextPage } from 'next'

import { type ProductsPageProps, getProductsStaticProps } from '@core/staticPages/products'
import { PageTypes } from '@core/constants/navigation'
import usePage from '@core/hooks/usePage'
import PageHeader from '@core/components/pages/PageHeader'
import LandingList from '@core/components/LandingList'

const ProductsPage: NextPage<ProductsPageProps> = (props) => {
  usePage()

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'products.metas.title',
          descriptionId: 'products.metas.description'
        }}
        marginTop={true}
      />

      <LandingList
        type="collectionsPage"
        landings={props.landings}
        title={{
          id: 'products.h1'
        }}
      />
    </>
  )
}

export default ProductsPage

export const getStaticProps = getProductsStaticProps
