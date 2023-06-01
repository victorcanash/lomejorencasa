import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import type { LandingTutorialConfig } from '@core/types/products';
import LinkButton from '@core/components/inputs/LinkButton';
import Title from '@core/components/ui/Title';
import MultimediaContainer from '@core/components/multimedia/MultimediaContainer';

type LandingTutorialProps = {
  tutorialConfig: LandingTutorialConfig, 
};

const LandingTutorial = (props: LandingTutorialProps) => {
  const { tutorialConfig } = props;

  return (
    <>
      <Container id="tutorial">
        <Box 
          maxWidth="sm"
          m="auto"
        >
          { tutorialConfig.title?.id &&
            <Title
              type="h2"
              texts={{
                title: tutorialConfig.title,
              }}
              divider={true}
            />
          }
        </Box>
      </Container>

      <MultimediaContainer
        type="default"
        source={tutorialConfig.source}
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
            align={tutorialConfig.content.textAlign}
          >
            <FormattedMessage
              id={tutorialConfig.content.id}
              values={tutorialConfig.content.values}
              defaultMessage={tutorialConfig.content.id}
            />
          </Typography>

          { tutorialConfig.button?.text.id && tutorialConfig.button?.path &&
            <LinkButton
              href={tutorialConfig.button.path}
              align={tutorialConfig.button.text.textAlign}
              customtype="actionPrimary"
              sx={{
                mt: 3,
              }}
            >
              <FormattedMessage 
                id={tutorialConfig.button.text.id}
                values={tutorialConfig.button.text.values}
                defaultMessage={tutorialConfig.button.text.id}
              />
            </LinkButton>
          }
        </Box>
      </Container>
    </>
  );
};

export default LandingTutorial;
