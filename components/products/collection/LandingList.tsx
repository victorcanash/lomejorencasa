// import { useRouter } from 'next/router';

import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';

import type { Landing } from '@core/types/products';
import { convertElementToSx } from '@core/utils/themes';
import { capitalizeFirstLetter } from '@core/utils/strings';
import { getFirstLandingItem, getLandingConfigById, getLandingPathByConfig, getProductPriceData } from '@core/utils/products';
import Link from '@core/components/Link';
import CustomImage from '@core/components/CustomImage';

import { pages } from '@lib/constants/navigation';
import colors from '@lib/constants/themes/colors';
import { themeCustomElements } from '@lib/constants/themes/elements';
import { allLandingConfigs } from '@lib/constants/products';
import { useProductsContext } from '@lib/contexts/ProductsContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import Title from '@core/components/ui/Title';
// import Pagination from '@components/ui/Pagination';

const LandingList = () => {
  const {
    getAllLandings,
    getItemImgUrl,
  } = useProductsContext();
  const { convertPriceToString } = useAuthContext();

  /*const router = useRouter();

  const handleChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    router.push()
  };*/

  const getLandingPath = (id: number) => {
    const landingConfig = getLandingConfigById(id, allLandingConfigs);
    if (landingConfig) {
      return getLandingPathByConfig(landingConfig);
    }
    return pages.home.path;
  };

  const landingName = (landing: Landing) => {
    let name = landing.name?.current || '';
    if (!name) {
      const landingConfig = getLandingConfigById(landing.id, allLandingConfigs);
      if (landingConfig) {
        name = landingConfig.product?.name?.current ? landingConfig.product.name.current : landingConfig.pack?.name?.current || '';
      }
    }
    if (!name) {
      const firstItem = getFirstLandingItem(landing);
      if (firstItem?.name?.current) {
        name = firstItem.name.current;
      }
    }
    return (
      <Typography component="div" variant="body1" mb={1}>
        {capitalizeFirstLetter(name)}
      </Typography>
    );
  };

  const landingPrice = (landing: Landing) => {
    let priceData = { price: 0, originPrice: 0 };
    const firstItem = getFirstLandingItem(landing);
    if (firstItem) {
      priceData = getProductPriceData(firstItem);
    }
    return (
      <Typography component="h2" variant="h2" sx={convertElementToSx(themeCustomElements.landing.priceContent.priceText)}>
        { priceData.price !== priceData.originPrice ?
          <>
            <span
              style={{ fontWeight: 500, textDecoration: 'line-through' }}
            >
              <span style={{ color: colors.text.disabled }}>
                {`${convertPriceToString(priceData.originPrice)}`}
              </span>
            </span>
            {` ${convertPriceToString(priceData.price)}`}
          </>
          :
          <>
            {`${convertPriceToString(priceData.price)}`}
          </>
        }
      </Typography>
    );
  };

  return (
    <Container>
      <Box 
        maxWidth="md"
        m="auto"
      >
        <Title
          type="h2"
          texts={{
            title: {
              id: 'productList.allCategories',
            },
          }}
          divider={true}
        />

        { getAllLandings().length > 0 ?
          <Masonry columns={{ xs: 1, xs_sm: 2, sm_md: 3 }} spacing={2}>
            {getAllLandings().map((item, index) => (
              <Box
                key={index}
              >
                <Card>
                  <CardActionArea component={Link} href={getLandingPath(item.id)} noLinkStyle>
                    <CardMedia>
                      <Box>
                        <CustomImage
                          src={getItemImgUrl(item)}
                          width="1080"
                          height="1080"
                          layout="responsive" 
                          objectFit="cover"
                          priority
                        />
                      </Box>
                    </CardMedia>
                    
                    <CardContent>
                      <Box>
                        { landingName(item) }
                        { landingPrice(item) }
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
            ))}
          </Masonry>
          :
          <Typography component="h3" variant="body1" sx={{ textAlign: "center" }}>
            <FormattedMessage
              id="productList.noItems"
            />
          </Typography>
        }

        {/*<Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onChangePage={handleChangePage}
        />*/}
      </Box>
    </Container>
  );
};

export default LandingList;
