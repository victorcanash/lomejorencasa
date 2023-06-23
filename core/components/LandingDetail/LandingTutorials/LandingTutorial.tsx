import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import type { NavItem } from '@core/types/navigation';
import type { FormatText } from '@core/types/texts';
import type { Source } from '@core/types/multimedia';
import LinkButton from '@core/components/inputs/LinkButton';
import Title from '@core/components/ui/Title';
import MultimediaContainer from '@core/components/multimedia/MultimediaContainer';

export type LandingTutorialProps = {
  title: FormatText,
  content: FormatText,
  source: Source,
  button?: NavItem,
};

const LandingTutorial = (props: LandingTutorialProps) => {
  const {
    title,
    content,
    source,
    button,
   } = props;

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
                title,
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
          <Typography
            component="div"
            variant="body1"
            sx={{ mt: 3 }}
            align={content.textAlign}
          >
            <FormattedMessage
              id={content.id}
              values={content.values}
              defaultMessage={content.id}
            />
          </Typography>

          { button?.text.id && button?.path &&
            <LinkButton
              href={button.path}
              align={button.text.textAlign}
              customtype="actionPrimary"
              sx={{
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
