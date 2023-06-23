import { useIntl, FormattedMessage } from 'react-intl';
// import { Pagination } from 'swiper';
// import { Swiper, SwiperSlide } from 'swiper/react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import UpdateIcon from '@mui/icons-material/Update';
// import Box from '@mui/material/Box';

import type { Landing } from '@core/types/products';
// import CustomImage from '@core/components/CustomImage';

type CheckLandingDetailProps = {
  landing: Landing,
  onClickUpdateBtn?: (landing: Landing) => void,
  creating?: boolean,
};

const CheckLandingDetail = (props: CheckLandingDetailProps) => {
  const {
    landing,
    onClickUpdateBtn,
    creating,
  } = props;

  const intl = useIntl();

  return (
    <>
      { !creating &&
        <Typography component="div" variant="body1">
          {`${intl.formatMessage({ id: 'forms.id' })}: ${landing.id}`}
        </Typography>
      }
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.slug' })}: ${landing.slug}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.name.en' })}: ${landing.name.en}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.name.es' })}: ${landing.name.es}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.description.en' })}: ${landing.description.en}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.description.es' })}: ${landing.description.es}`}
      </Typography>
      { landing.images.map((image, index) => (
        <Typography key={index} component="div" variant="body1">
          {`${intl.formatMessage({ id: 'forms.image' })}: ${image}`}
        </Typography>
      ))}
      { landing.tutorialSources.map((tutorialSource, index) => (
        <Typography key={index} component="div" variant="body1">
          {`${intl.formatMessage({ id: 'forms.tutorialSource' })}: ${tutorialSource}`}
        </Typography>
      ))}
      {!creating &&
        <>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.rating' })}: ${landing.rating}`}
          </Typography>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.reviewsCount' })}: ${landing.reviewsCount}`}
          </Typography>

          <Button
            startIcon={<UpdateIcon />}
            onClick={onClickUpdateBtn ? () => onClickUpdateBtn(landing) : undefined}
          >
            <FormattedMessage
              id="admin.updateLandingBtn"
            />
          </Button>
        </>
      }
    </>
  );
};

export default CheckLandingDetail;
