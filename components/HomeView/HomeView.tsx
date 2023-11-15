import Box from '@mui/material/Box'

import { type HomePageProps } from '@core/staticPages/home'
import HomeBanner from '@core/components/banners/productBanners/HomeBanner'
import CategoryList from '@core/components/CategoryList'
import LandingList from '@core/components/LandingList'
import BlogsList from '@core/components/BlogsList'
import ProductReviews from '@core/components/ProductReviews'

interface HomeViewProps {
  pageProps: HomePageProps
}
const HomeView = (props: HomeViewProps) => {
  const { pageProps } = props

  return (
    <Box>
      <HomeBanner
        type="allProducts"
      />

      <CategoryList
        type="stack"
        categories={pageProps.categoryGroups}
      />

      <LandingList
        type="stack"
        category={pageProps.categoryFeatured}
        landings={pageProps.landingsFeatured}
        marginBottom
      />

      <HomeBanner
        type="seasonal"
      />

      <LandingList
        type="stack"
        category={pageProps.categoryNews}
        landings={pageProps.landingsNews}
        marginBottom
      />

      <HomeBanner
        type="offers"
      />

      <ProductReviews />

      <BlogsList />
    </Box>
  )
}

export default HomeView
