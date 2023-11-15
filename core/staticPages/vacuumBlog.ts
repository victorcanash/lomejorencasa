import type { GetStaticProps } from 'next'

import type { Landing } from '@core/types/products'
import { getLanding } from '@core/utils/products'

export interface VacuumBlogPageProps {
  landingVacuumMachine: Landing
  landingVacuumBags: Landing
}

export const getVacuumBlogStaticProps: GetStaticProps = async () => {
  let landingVacuumMachine: Landing = {
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
  let landingVacuumBags: Landing = {
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
  await getLanding('envasadora-al-vacio-everfresh')
    .then((response) => {
      landingVacuumMachine = response.landing
    })
    .catch((error) => {
      throw error
    })
  await getLanding('bolsas-de-vacio-tm-electron')
    .then((response) => {
      landingVacuumBags = response.landing
    })
    .catch((error) => {
      throw error
    })

  const props: VacuumBlogPageProps = {
    landingVacuumMachine,
    landingVacuumBags
  }
  return {
    props
  }
}
