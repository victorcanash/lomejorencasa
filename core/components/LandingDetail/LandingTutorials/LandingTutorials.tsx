import { useMemo } from 'react'

import { useIntl } from 'react-intl'

import type { Landing } from '@core/types/products'
import LandingTutorial, { type LandingTutorialProps } from './LandingTutorial'

interface LandingTutorialsProps {
  landing: Landing
}

const LandingTutorials = (props: LandingTutorialsProps) => {
  const { landing } = props

  const intl = useIntl()

  const tutorialPropsList = useMemo(() => {
    const textId = `landing.${landing.slug}.tutorials`

    let count = 0
    while (
      intl.messages[`${textId}.${count + 1}.title`] != null && intl.messages[`${textId}.${count + 1}.title`] !== '' &&
      intl.messages[`${textId}.${count + 1}.content`] != null && intl.messages[`${textId}.${count + 1}.content`] !== '' &&
      landing.tutorialSources.length >= (count + 1)
    ) {
      count++
    }

    const tutorialPropsElements = [] as LandingTutorialProps[]
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        tutorialPropsElements.push({
          title: {
            id: `${textId}.${i + 1}.title`
          },
          content: {
            id: `${textId}.${i + 1}.content`
          },
          source: {
            type: landing.tutorialSources[i].includes('.mp4') ? 'video' : 'image',
            src: landing.tutorialSources[i],
            alt: landing.name.current
          }
        })
      }
    }
    return tutorialPropsElements
  }, [intl, landing.name, landing.slug, landing.tutorialSources])

  return (
    <>
      { tutorialPropsList.map((tutorialProps, index) => (
        <LandingTutorial
          key={index}
          {...tutorialProps}
        />
      ))}
    </>
  )
}

export default LandingTutorials
