import type { GetStaticProps, GetStaticPaths } from 'next'
import { type ParsedUrlQuery } from 'querystring'

import type { Landing, ProductCategory, ProductCategoryGroup } from '@core/types/products'
import { getAllProductCategories, getProductCategory } from '@core/utils/products'

export interface CategoryPageProps {
  category: ProductCategoryGroup | ProductCategory
  landings: Landing[]
}

interface ICategoryPageParams extends ParsedUrlQuery {
  category: string
};

export const getCategoryStaticPaths: GetStaticPaths = async () => {
  let categoriesGroups: ProductCategoryGroup[] = []
  let categories: ProductCategory[] = []
  await getAllProductCategories(true)
    .then((response) => {
      categoriesGroups = response.productCategories
    })
    .catch((error) => {
      throw error
    })
  await getAllProductCategories()
    .then((response) => {
      categories = response.productCategories
    })
    .catch((error) => {
      throw error
    })

  const allCategories: Array<ProductCategoryGroup | ProductCategory> = categoriesGroups.concat(categories)
  const paths = allCategories.map((category) => {
    const pageParams: ICategoryPageParams = {
      category: category.slug
    }
    return {
      params: pageParams
    }
  })
  return {
    paths,
    fallback: false
  }
}

export const getCategoryStaticProps: GetStaticProps = async (context) => {
  const { category: slug } = context.params as ICategoryPageParams

  let category: ProductCategoryGroup | ProductCategory = {
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
  let landings: Landing[] = []
  await getProductCategory(slug)
    .then((response) => {
      category = response.productCategory
      landings = response.landingsResult.landings
    })
    .catch((error) => {
      throw error
    })

  const props: CategoryPageProps = {
    category,
    landings
  }
  return {
    props
  }
}
