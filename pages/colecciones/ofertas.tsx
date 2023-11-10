import type { NextPage } from 'next'

import { type OffersPageProps, getOffersStaticProps } from '@core/staticPages/offers'
import { PageTypes } from '@core/constants/navigation'
import usePage from '@core/hooks/usePage'
import PageHeader from '@core/components/pages/PageHeader'
import LandingList from '@core/components/LandingList'

const OffersPage: NextPage<OffersPageProps> = (props) => {
  usePage()

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'offers.metas.title',
          descriptionId: 'offers.metas.description'
        }}
        marginTop={true}
      />

      <LandingList
        type="collectionsPage"
        landings={props.landings}
        title={{
          id: 'offers.h1'
        }}
      />
    </>
  )
}

export default OffersPage

export const getStaticProps = getOffersStaticProps
