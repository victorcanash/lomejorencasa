import { FormattedMessage } from 'react-intl';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import type { FormatText } from '@core/types/texts';

type TitleProps = {
  type: 'h1' | 'h2',
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
      <Typography 
        component={type} 
        variant={type} 
        align={texts.title?.textAlign ? texts.title.textAlign : 'left'}
        mt={noMarginTop ? undefined : 3}
        mb={divider ? undefined : 3}
      >
        { texts.title?.id &&
          <FormattedMessage id={texts.title.id} defaultMessage={texts.title.id} values={texts.title.values} />
        }
        { texts.titleAdd }
      </Typography>
      
      { divider &&
        <Divider sx={{ mt: 1, mb: 3 }} />
      }
    </>
  );
};

export default Title
