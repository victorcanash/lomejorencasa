import { FormattedMessage } from 'react-intl';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import type { FormatText } from '@core/types/texts';
import { convertElementToSx } from '@core/utils/themes';

import { themeCustomElements } from '@lib/constants/themes/elements';

type TitleProps = {
  type: 'h1' | 'h2' | 'h3Home' | 'h4Home',
  noMarginTop?: boolean,
  texts: {
    title?: FormatText,
    titleAdd?: string,
  }
  divider: boolean,
};

const Title = (props: TitleProps) => {
  const {
    type,
    noMarginTop,
    texts,
    divider,
  } = props;

  return (
    <>
      { (type === 'h1' || type === 'h2') &&
        <>
          <Typography 
            component={type} 
            variant={type} 
            align={texts.title?.textAlign}
            mt={noMarginTop ? undefined : 6}
            mb={divider ? undefined : 4}
          >
            { texts.title?.id &&
              <FormattedMessage id={texts.title.id} defaultMessage={texts.title.id} values={texts.title.values} />
            }
            { texts.titleAdd }
          </Typography>
          
          { divider &&
            <Divider sx={{ mt: 1, mb: 4 }} />
          }
        </>
      }
      { (type === 'h3Home' || type === 'h4Home') &&
        <>
          <Box
            sx={{
              ...convertElementToSx(type == 'h3Home' ? 
                themeCustomElements.home.title.h3 : themeCustomElements.home.title.h4),
              width: 'max-content',
              mt: noMarginTop ? undefined : 4,
              mb: 4,
              ml: -3,
              p: 3,
            }}
          >
            <Typography 
              component={type == 'h3Home' ? 'h3' : 'h4'} 
              variant={type == 'h3Home' ? 'h3' : 'h4'} 
              align={texts.title?.textAlign}
            >
              { texts.title?.id &&
                <FormattedMessage id={texts.title.id} defaultMessage={texts.title.id} values={texts.title.values} />
              }
              { texts.titleAdd }
            </Typography>
          </Box>
        </>
      }
    </>
  );
};

export default Title
