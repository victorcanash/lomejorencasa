import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import type { FormatText } from '@core/types/texts';
import type { NavItem } from '@core/types/navigation';
import type { Source } from '@core/types/multimedia';
import { convertElementToSx } from '@core/utils/themes';
import LinkButton from '@core/components/LinkButton';

import { themeCustomElements } from '@lib/constants/themes/elements';
import Title from '@core/components/ui/Title';
import MultimediaContainer from '@components/multimedia/MultimediaContainer';

type LandingTutorialProps = {
  title?: FormatText,
  content: FormatText,
  button?: NavItem,
  source: Source,
};

const LandingTutorial = (props: LandingTutorialProps) => {
  const { title, content, button, source } = props;

  return (
    <>
      <Container id="tutorial">
        <Box 
          maxWidth="sm"
          m="auto"
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
        </Box>
      </Container>

      <MultimediaContainer
        type="default"
        source={source}
        mt={0}
      />

      <Container>
        <Box 
          maxWidth="sm"
          m="auto"
        >
          <Typography component="div" variant="body1" sx={{ mt: 3 }} align={content.textAlign}>
            <FormattedMessage id={content.id} values={content.values} defaultMessage={content.id} />
          </Typography>

          { button?.text.id && button?.path &&
            <LinkButton
              href={button.path}
              align={button.text.textAlign}
              sx={{
                ...convertElementToSx(themeCustomElements.button.action.primary),
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
      </Container>
    </>
  );
};

export default LandingTutorial;
