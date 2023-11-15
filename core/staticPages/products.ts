import type { GetStaticProps } from 'next'

import type { Landing } from '@core/types/products'
import { getAllLandings } from '@core/utils/products'

export interface ProductsPageProps {
  landings: Landing[]
}

export const getProductsStaticProps: GetStaticProps = async () => {
  let landings: Landing[] = []
  await getAllLandings(true)
    .then((response) => {
      landings = response.landings
    })
    .catch((error) => {
      throw error
    })

  const props: ProductsPageProps = {
    landings
  }
  return {
    props
  }
}
