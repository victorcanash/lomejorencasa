import Box from '@mui/material/Box';

import { HomePageProps } from '@core/staticPages/home';
import HomeBanner from '@core/components/banners/productBanners/HomeBanner';
import CategoryList from '@core/components/CategoryList';
import LandingList from '@core/components/LandingList';
import BlogsList from '@core/components/BlogsList';
import ProductReviews from '@core/components/ProductReviews';

import { homeBannersConfig } from '@lib/config/productBanners.config';
import { themeCustomElements } from '@lib/config/theme/elements';

type HomeViewProps = {
  pageProps: HomePageProps,
}
const HomeView = (props: HomeViewProps) => {
  const { pageProps } = props;

  return (
    <Box>
      <HomeBanner
        productBannerConfig={homeBannersConfig.allProducts}
        typographyThemeElements={themeCustomElements.banners?.home?.allProducts}
      />

      <CategoryList
        type="stack"
        categories={pageProps.categoryGroups}
      />

      { pageProps.categoryFeatured &&
        <LandingList
          type="stack"
          category={pageProps.categoryFeatured}
          landings={pageProps.landingsFeatured}
          marginBottom
        />
      }

      <HomeBanner
        productBannerConfig={homeBannersConfig.seasonal}
        typographyThemeElements={themeCustomElements.banners?.home?.allProducts}
      />

      { pageProps.categoryNews &&
        <LandingList
          type="stack"
          category={pageProps.categoryNews}
          landings={pageProps.landingsNews}
          marginBottom
        />
      }

      <HomeBanner
        productBannerConfig={homeBannersConfig.offers}
        typographyThemeElements={themeCustomElements.banners?.home?.allProducts}
      />

      <BlogsList />

      <ProductReviews />
    </Box>
  );
};

export default HomeView;
