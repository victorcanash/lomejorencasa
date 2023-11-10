import type { NextPage } from 'next'

import { type CollectionsPageProps, getCollectionsStaticProps } from '@core/staticPages/collections'
import { PageTypes } from '@core/constants/navigation'
import usePage from '@core/hooks/usePage'
import PageHeader from '@core/components/pages/PageHeader'
import CategoryList from '@core/components/CategoryList'

const CollectionsPage: NextPage<CollectionsPageProps> = (props) => {
  usePage()

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'collections.metas.title',
          descriptionId: 'collections.metas.description',
          noindex: true,
          nofollow: true
        }}
        marginTop={true}
        texts={{
          title: {
            id: 'collections.h1'
          }
        }}
      />

      <CategoryList
        type="collectionsPage"
        categories={props.categories}
      />
    </>
  )
}

export default CollectionsPage

export const getStaticProps = getCollectionsStaticProps
