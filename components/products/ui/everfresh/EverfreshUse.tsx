/* eslint-disable @typescript-eslint/no-var-requires */
import Image, { StaticImageData } from 'next/image';

import { FormattedMessage } from 'react-intl';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Link from '@core/components/Link';

import { pages } from '@lib/constants/navigation';

const EverfreshUse = () => {
  const source = (type: 'video' | 'image', src: StaticImageData | 'string') => {
    if (type == 'video') {
      return (
        <video 
          loop
          muted
          autoPlay={true}  
          style={{ 
            position: 'relative',
            width: '100%', 
            height: '100%',
            borderRadius: '10px',
          }}
        >
          <source src={src as string} />
        </video>
      );
    }
    return (
      <Image 
        src={src} 
        alt="Tutorial" 
        width={500}
        height={500}
        quality={100}
        layout="responsive" 
        objectFit="cover"
        style={{ borderRadius: '10px' }}
      />
    );
  };

  return (
    <Box
      sx={{
        maxWidth: '600px',
        m: 'auto',
      }}
    >
      <Typography component={"h2"} variant={"h1"} sx={{ mb: 3, textAlign: 'center' }}>
        <FormattedMessage id="home.use.title" />
      </Typography>
      <Typography component="div" variant="body1" sx={{ mb: 3 }}>
        <FormattedMessage id="home.use.description" />
      </Typography>

      <Typography component={"h3"} variant={"h2"} sx={{ mb: 3, textAlign: 'center' }}>
        <FormattedMessage id="home.use.foodPreparation.title" />
      </Typography>
      <Typography component="div" variant="body1" sx={{ mb: 3 }}>
        <FormattedMessage id="home.use.foodPreparation.description" />
      </Typography>

      <Typography component={"h3"} variant={"h2"} sx={{ mb: 3, textAlign: 'center' }}>
        <FormattedMessage id="home.use.bagSelection.title" />
      </Typography>
      <Typography component="div" variant="body1" sx={{ mb: 2 }}>
        <FormattedMessage id="home.use.bagSelection.description" />
      </Typography>
      <Typography component={Link} href={pages.bags.path} variant="body1">
        <FormattedMessage id="home.use.bagSelection.link" />
      </Typography>

      <Typography component={"h3"} variant={"h2"} sx={{ my: 3, textAlign: 'center' }}>
        <FormattedMessage id="home.use.packingMachine.title" />
      </Typography>
      <Typography component="div" variant="body1" sx={{ mb: 2 }}>
        <FormattedMessage id="home.use.packingMachine.1" />
      </Typography>
      { source('video', require('../../../../public/videos/home/everfresh1.mp4')) }
      <Typography component="div" variant="body1" sx={{ mt: 1, mb: 2 }}>
        <FormattedMessage id="home.use.packingMachine.2" />
      </Typography>
      { source('video', require('../../../../public/videos/home/everfresh1.mp4')) }
      <Typography component="div" variant="body1" sx={{ mt: 1, mb: 2 }}>
        <FormattedMessage id="home.use.packingMachine.3" />
      </Typography>
      { source('video', require('../../../../public/videos/home/everfresh1.mp4')) }
      <Typography component="div" variant="body1" sx={{ mt: 1, mb: 2 }}>
        <FormattedMessage id="home.use.packingMachine.4" />
      </Typography>
      { source('video', require('../../../../public/videos/home/everfresh1.mp4')) }
    </Box>
  );
};

export default EverfreshUse;
