import { useMemo } from 'react';

import { useIntl } from 'react-intl';

import type { Landing } from '@core/types/products';
import type { Source } from '@core/types/multimedia';
import LandingTutorial, { LandingTutorialProps } from './LandingTutorial';

type LandingTutorialsProps = {
  landing: Landing,
};

const LandingTutorials = (props: LandingTutorialsProps) => {
  const { landing } = props;

  const intl = useIntl();

  const tutorialPropsList = useMemo(() => {
    let count = 1;
    const textId = `landing.${landing.slug}.tutorials`;
    //intl.fallbackOnEmptyString = false;
    while (count !== -1) {
      const existingTitleText = intl.formatMessage({ id: `${textId}.${count}.title`, defaultMessage: '' });
      const existingContentText = intl.formatMessage({ id: `${textId}.${count}.content`, defaultMessage: '' });
      const existingSource = landing.tutorialSources.length >= count ? true : false;
      if (existingTitleText && existingContentText && existingSource) {
        count++;
      } else {
        count = -1;
      }
    }

    const tutorialPropsElements = [] as LandingTutorialProps[];
    if (count !== -1) {
      for (let i = 0; i < count; i++) {
        tutorialPropsElements.push({
          title: {
            id: `${textId}.${i + 1}.title`,
          },
          content: {
            id: `${textId}.${i + 1}.content`,
          },
          source: {
            type: landing.tutorialSources[i].includes('.mp4') ? 'video' : 'image',
            src: landing.tutorialSources[i],
            alt: landing.name.current,
          }
        })
      }
    }
    return tutorialPropsElements;
  }, [intl, landing.name, landing.slug, landing.tutorialSources]);

  return (
    <>
      { tutorialPropsList.map((tutorialProps, index) => (
        <LandingTutorial
          key={index}
          {...tutorialProps}
        />
      ))}
    </>
  );
};

export default LandingTutorials;
