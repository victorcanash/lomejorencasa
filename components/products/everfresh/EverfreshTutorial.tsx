import Image, { StaticImageData } from 'next/image';

import { FormattedMessage } from 'react-intl';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type EverfreshTutorialProps = {
  textId: string,
  src: StaticImageData,
};

const EverfreshTutorial = (props: EverfreshTutorialProps) => {
  const { textId, src } = props;

  return (
    <Grid
      container
      spacing={3}
      className='animate__animated animate__fadeIn'
      mb={3}
    >
      <Grid 
        item 
        xs={12}
      >
        <Box 
          className="centered-container-img"
          sx={{ textAlign: 'center' }}
        >
          <Typography component="div" variant="body1" sx={{ mb: 3 }}>
            <FormattedMessage id={textId} />
          </Typography>
        </Box>
        <Box 
          className='centered-container-img'
          sx={{ 
            border: '1px solid black',
            mb: 3,
          }}
        >
          <Image 
            src={src} 
            alt="Tutorial" 
            width={500}
            height={500}
            layout="responsive" 
            objectFit="cover" 
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default EverfreshTutorial;
