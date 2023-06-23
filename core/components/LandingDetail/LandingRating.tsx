import { useMemo } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

import type { Landing } from '@core/types/products';
import { scrollToSection } from '@core/utils/navigation';
import { useAppContext } from '@core/contexts/AppContext';
import { useProductsContext } from '@core/contexts/ProductsContext';
import LoadingRating from '@core/components/ui/LoadingRating';
import Link from '@core/components/navigation/Link';

type LandingRatingProps = {
  landing: Landing,
};

const LandingRating = (props: LandingRatingProps) => {
  const {
    landing,
  } = props;

  const { initialized } = useAppContext();
  const { getItemPath } = useProductsContext();

  const data = useMemo(() => {
    let rating = 0;
    let reviewsCount = 0;
    if (landing.products.length > 0) {
      rating = parseFloat(landing.products[0].rating);
      reviewsCount = landing.products[0].reviewsCount;
    } else if (landing.packs.length > 0) {
      rating = parseFloat(landing.packs[0].rating);
      reviewsCount = landing.packs[0].reviewsCount;
    }
    return {
      rating,
      reviewsCount,
    };
  }, [landing.packs, landing.products]);
  
  return (
    <>
      { !initialized ?
        <LoadingRating />
        :
        <Link
          href={getItemPath(landing)}
          onClick={() => scrollToSection('reviews')}
          scroll={false}
          sx={{ textDecoration: 'none' }}
        >
          <Grid container>
            <Grid item>
              <Rating
                value={data.rating}
                precision={0.5}
                readOnly
              />
            </Grid>
            <Grid item sx={{ ml: '6px' }}>
              <Typography component="span" variant="body1">
                {`(${data.reviewsCount})`}
              </Typography>
            </Grid>
          </Grid>
        </Link>
      }
    </>
  );
};

export default LandingRating;
