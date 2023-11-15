import type { GetStaticProps, GetStaticPaths } from 'next'
import { type ParsedUrlQuery } from 'querystring'

import type { Landing } from '@core/types/products'
import { getAllLandings, getLanding } from '@core/utils/products'

export interface LandingPageProps {
  landing: Landing
}

interface ILandingPageParams extends ParsedUrlQuery {
  landing: string
};

export const getLandingStaticPaths: GetStaticPaths = async () => {
  let landings: Landing[] = []
  await getAllLandings()
    .then((response) => {
      landings = response.landings
    })
    .catch((error) => {
      throw error
    })

  const paths = landings.map((landing) => {
    const params: ILandingPageParams = {
      landing: landing.slug
    }
    return {
      params
    }
  })
  return {
    paths,
    fallback: false
  }
}

export const getLandingStaticProps: GetStaticProps = async (context) => {
  const { landing: slug } = context.params as ILandingPageParams

  let landing: Landing = {
    id: -1,
    slug: '',
    name: {
      en: '',
      es: '',
      current: ''
    },
    description: {
      en: '',
      es: '',
      current: ''
    },
    images: [],
    tutorialSources: [],
    rating: '',
    reviewsCount: -1,
    products: [],
    packs: []
  }
  await getLanding(slug)
    .then((response) => {
      landing = response.landing
    })
    .catch((error) => {
      throw error
    })

  const props: LandingPageProps = {
    landing
  }
  return {
    props
  }
}
