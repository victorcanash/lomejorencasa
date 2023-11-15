import type { GetStaticProps } from 'next'

import type { Landing, ProductCategory, ProductCategoryGroup } from '@core/types/products'
import { getAllProductCategories, getProductCategory } from '@core/utils/products'

export interface HomePageProps {
  categoryGroups: ProductCategoryGroup[]
  categoryFeatured: ProductCategory
  landingsFeatured: Landing[]
  categoryNews: ProductCategory
  landingsNews: Landing[]
}

export const getHomeStaticProps: GetStaticProps = async () => {
  let categoryGroups: ProductCategoryGroup[] = []
  await getAllProductCategories(true)
    .then((response) => {
      categoryGroups = response.productCategories
    })
    .catch((error) => {
      throw error
    })

  let categoryFeatured: ProductCategory = {
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
    }
  }
  let landingsFeatured: Landing[] = []
  await getProductCategory('productos-destacados')
    .then((response) => {
      categoryFeatured = response.productCategory
      landingsFeatured = response.landingsResult.landings
    })
    .catch((error) => {
      throw error
    })

  let categoryNews: ProductCategory = {
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
    }
  }
  let landingsNews: Landing[] = []
  await getProductCategory('novedades')
    .then((response) => {
      categoryNews = response.productCategory
      landingsNews = response.landingsResult.landings
    })
    .catch((error) => {
      throw error
    })

  const props = {
    categoryGroups,
    categoryFeatured,
    landingsFeatured,
    categoryNews,
    landingsNews
  }
  return {
    props
  }
}
