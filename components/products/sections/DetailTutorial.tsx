import Image, { StaticImageData } from 'next/image';

import { FormattedMessage } from 'react-intl';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import type { FormatText } from '@core/types/texts';
import type { NavItem } from '@core/types/navigation';
import { convertElementToSx } from '@core/utils/themes';
import LinkButton from '@core/components/LinkButton';

import { themeCustomElements } from '@lib/constants/themes/elements';
import Title from '@components/ui/Title';

type DetailTutorialProps = {
  title?: FormatText,
  content: FormatText,
  button?: NavItem,
  source: {
    type?: 'video' | 'image',
    src: StaticImageData | 'string',
  },
};

const DetailTutorial = (props: DetailTutorialProps) => {
  const { title, content, button, source } = props;

  const maxWidth = '800px';

  return (
    <Box 
      sx={{ 
        maxWidth, 
        m: 'auto',
      }}
    >

      { title?.id &&
        <Title
          type="h2"
          texts={{
            title: title,
          }}
          divider={true}
        />
      }

      { source.type == 'video' ?
        <video
          loop
          muted
          autoPlay
          playsInline
          style={{ 
            position: 'relative',
            width: '100%', 
            height: '100%',
            borderRadius: '10px',
          }}
        >
          <source 
            src={source.src as string} 
            type="video/mp4" 
          />
        </video> :
        <Image 
          src={source.src} 
          alt="Tutorial" 
          width={500}
          height={500}
          quality={100}
          layout="responsive" 
          objectFit="cover"
          style={{ borderRadius: '10px' }}
        />
      }

      <Typography component="div" variant="body1" sx={{ mt: 3 }} align={content.textAlign}>
        <FormattedMessage id={content.id} values={content.values} defaultMessage={content.id} />
      </Typography>

      { button?.text.id && button?.path &&
        <LinkButton
          href={button.path}
          align={button.text.textAlign}
          sx={{
            ...convertElementToSx(themeCustomElements.button.action),
            mt: 3,
          }}
        >
          <FormattedMessage 
            id={button.text.id}
            values={button.text.values}
            defaultMessage={button.text.id}
          />
        </LinkButton>
      }

    </Box>
  );
};

export default DetailTutorial;
