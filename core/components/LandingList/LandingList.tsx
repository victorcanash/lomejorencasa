import { useState, useMemo, useCallback, ChangeEvent } from 'react';

import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Masonry from '@mui/lab/Masonry';

import type { Landing } from '@core/types/products';
import { capitalizeFirstLetter } from '@core/utils/strings';
import { convertElementToSx } from '@core/utils/themes';
import {
  getFirstLandingItem,
  getLandingConfigById,
  getLandingPathByConfig,
  getProductPriceData,
} from '@core/utils/products';
import { scrollToSection } from '@core/utils/navigation';
import { useProductsContext } from '@core/contexts/ProductsContext';
import useCart from '@core/hooks/useCart';
import Link from '@core/components/navigation/Link';
import CustomImage from '@core/components/multimedia/CustomImage';
import Title from '@core/components/ui/Title';
import Pagination from '@core/components/ui/Pagination';
import ProductPrice from '@core/components/ProductPrice';

import { pages } from '@lib/config/navigation.config';
import { landingConfigs } from '@lib/config/inventory.config';
import { themeCustomElements } from '@lib/config/theme/elements';

const LandingList = () => {
  const {
    getAllLandings,
    getItemImgUrl,
  } = useProductsContext();

  const { addCartItem } = useCart(false);

  const [currentPage, setCurrentPage] = useState(1);

  const limitByPage = useMemo(() => {
    return 40;
  }, []);

  const allLandings = useMemo(() => {
    scrollToSection('landings', false);
    return getAllLandings().slice((currentPage - 1) * limitByPage, currentPage * limitByPage);
  }, [currentPage, getAllLandings, limitByPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(allLandings.length / limitByPage);
  }, [allLandings.length, limitByPage]);

  const handleChangePage = useCallback((_event: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  }, []);

  const onClickAddCartBtn = useCallback((landing: Landing) => {
    const firstItem = getFirstLandingItem(landing);
    if (firstItem) {
      addCartItem(firstItem, 1);
    }
  }, [addCartItem]);

  const getLandingPath = useCallback((id: number) => {
    const landingConfig = getLandingConfigById(id, landingConfigs);
    if (landingConfig) {
      return getLandingPathByConfig(landingConfig);
    }
    return pages.home.path;
  }, []);

  const getLandingName = useCallback((landing: Landing) => {
    let name = landing.name?.current || '';
    if (!name) {
      const landingConfig = getLandingConfigById(landing.id, landingConfigs);
      if (landingConfig) {
        name = landingConfig.product?.name?.current ?
          landingConfig.product.name.current : landingConfig.pack?.name?.current || '';
      }
    }
    if (!name) {
      const firstItem = getFirstLandingItem(landing);
      if (firstItem?.name?.current) {
        name = firstItem.name.current;
      }
    }
    return capitalizeFirstLetter(name);
  }, []);

  const getLandingPrice = useCallback((landing: Landing) => {
    let priceData = { price: 0, originPrice: 0 };
    const firstItem = getFirstLandingItem(landing);
    if (firstItem) {
      priceData = getProductPriceData(firstItem);
    }
    return priceData;
  }, []);

  return (
    <Container id="landings">
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

        { allLandings.length > 0 ?
          <Masonry columns={{ xs: 2, sm_md: 3 }} spacing={0}>
            {allLandings.map((landing, index) => (
              <Box
                key={index}
              >
                <Box
                  sx={{
                    m: 'auto',
                    mb: {
                      xs: 1,
                      sm: 2,
                    },
                    px: {
                      xs: 0.5,
                      sm: 1,
                    }
                  }}
                >
                  <Card sx={{ overflow: 'visible' }}>
                    <CardHeader
                      sx={{
                        height: '0px',
                        p: 0,
                        position: 'relative',
                        zIndex: 1,
                      }}
                      action={
                        <IconButton
                          onClick={() => onClickAddCartBtn(landing)}
                          sx={{
                            ...themeCustomElements.button?.action?.primary ?
                              convertElementToSx(themeCustomElements.button.action.primary) : undefined,
                            p: '1px',
                            position: 'relative',
                            right: '2px',
                            top: '-3px',
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      }
                    />
                    <CardActionArea component={Link} href={getLandingPath(landing.id)}>
                      <CardMedia>
                        <Box>
                          <CustomImage
                            src={getItemImgUrl(landing)}
                            width="1080"
                            height="1080"
                            layout="responsive" 
                            objectFit="cover"
                            priority
                          />
                        </Box>
                      </CardMedia>
                      
                      <CardContent
                        sx={{
                          p: 1,
                        }}
                      >
                        <Box>
                          <Typography
                            component="div"
                            variant="body1"
                            mb={1}
                            sx={{
                              ...themeCustomElements.landingList?.nameText?
                                convertElementToSx(themeCustomElements.landingList.nameText) : undefined,
                              wordWrap: 'break-word',
                            }}
                          >
                            { getLandingName(landing) }
                          </Typography>
                          <ProductPrice
                            type="landingList"
                            price={getLandingPrice(landing).price}
                            originPrice={getLandingPrice(landing).originPrice}
                          />
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Box>
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

        {/* Pagination */}
        <Box mt={allLandings.length > 0 ? 3 : 5} />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onChangePage={handleChangePage}
        />
      </Box>
    </Container>
  );
};

export default LandingList;
