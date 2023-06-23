import { ReactNode, useCallback } from 'react';

import { useIntl } from 'react-intl';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import type { FormatText } from '@core/types/texts';
import type { Landing } from '@core/types/products';
import Divider from '@core/components/ui/Divider';
import CharacteristicsGroup from './CharacteristicsGroup';

import { pages } from '@lib/config/navigation.config';
import { themeCustomElements } from '@lib/config/theme/elements';

type LandingCharacteristicsProps = {
  landing: Landing,
};

const LandingCharacteristics = (props: LandingCharacteristicsProps) => {
  const { landing } = props;

  const intl = useIntl();

  const getElements = useCallback((text: FormatText) => {
    let count = 1;
    //intl.fallbackOnEmptyString = false;
    while (count !== -1) {
      const existingText = intl.formatMessage({ id: `${text.id}.${count}`, defaultMessage: '' });
      if (existingText) {
        count++;
      } else {
        count = -1;
      }
    }

    const elements = [] as FormatText[];
    if (count !== -1) {
      for (let i = 0; i < count; i++) {
        elements.push({
          id: `${text.id}.${i + 1}`,
          values: {
            'title': (...chunks: ReactNode[]) => (
              <>
                <span style={{ fontWeight: 500 }}>
                  {chunks}
                </span>
                <Divider themeElement={themeCustomElements.dividers?.subdivider} />
              </>
            ),
          },
        })
      }
    }
    return elements;
  }, [intl]);

  return (
    <Container id="characteristics">
      <Grid
        container
        spacing={1}
        mt={2.5}
      >
        <CharacteristicsGroup
          title={{
            id: 'productDetail.details.title',
          }}
          elements={
            getElements(
              { id: `landing.${landing.slug}.details` },
            )
          }
        />
        <CharacteristicsGroup
          title={{
            id: 'productDetail.includes.title',
          }}
          elements={
            getElements(
              { id: `landing.${landing.slug}.includes` },
            )
          }
        />
        <CharacteristicsGroup
          title={{
            id: 'productDetail.dimensions.title',
          }}
          elements={
            getElements(
              { id: `landing.${landing.slug}.dimensions` },
            )
          }
        />
        <CharacteristicsGroup
          title={{
            id: 'productDetail.shipping.title',
          }}
          elements={[
            { id: 'productDetail.shipping.1' }, { id: 'productDetail.shipping.2' }, { id: 'productDetail.shipping.3' }
          ]}
          link={{
            path: pages.orders.path,
            text: {
              id: 'productDetail.shipping.link',
            },
          }}
        />
        <CharacteristicsGroup
          title={{
            id: 'productDetail.refund.title',
          }}
          elements={[
            { id: 'productDetail.refund.1' }, { id: 'productDetail.refund.2' }
          ]}
          link={{
            path: pages.resolutions.path,
            text: {
              id: 'productDetail.refund.link',
            },
          }}
        />
      </Grid>
    </Container>
  );
};

export default LandingCharacteristics;
