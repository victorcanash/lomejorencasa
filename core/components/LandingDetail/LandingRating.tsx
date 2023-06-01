import { useMemo } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

import type { Landing, LandingConfig } from '@core/types/products';
import { scrollToSection } from '@core/utils/navigation';
import { getLandingPathByConfig } from '@core/utils/products';
import { useAppContext } from '@core/contexts/AppContext';
import LoadingRating from '@core/components/ui/LoadingRating';
import Link from '@core/components/navigation/Link';

type LandingRatingProps = {
  landingModel: Landing,
  landingConfig: LandingConfig,
};

const LandingRating = (props: LandingRatingProps) => {
  const {
    landingModel,
    landingConfig,
  } = props;

  const { initialized } = useAppContext();

  const data = useMemo(() => {
    let rating = 0;
    let reviewsCount = 0;
    if (landingModel.products.length > 0) {
      rating = parseFloat(landingModel.products[0].rating);
      reviewsCount = landingModel.products[0].reviewsCount;
    } else if (landingModel.packs.length > 0) {
      rating = parseFloat(landingModel.packs[0].rating);
      reviewsCount = landingModel.packs[0].reviewsCount;
    }
    return {
      rating,
      reviewsCount,
    };
  }, [landingModel.packs, landingModel.products]);
  
  return (
    <>
      { !initialized ?
        <LoadingRating />
        :
        <Link
          href={getLandingPathByConfig(landingConfig)}
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
