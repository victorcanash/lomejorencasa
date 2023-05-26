import { ReactNode, useCallback } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import type { FormatText } from '@core/types/texts';
import type { LandingConfig } from '@core/types/products';
import Divider from '@core/components/ui/Divider';

import { pages } from '@lib/config/navigation.config';
import { themeCustomElements } from '@lib/constants/themes/elements';
import CharacteristicsGroup from '@components/products/detail/characteristics/CharacteristicsGroup';

type DetailCharacteristicsProps = {
  landingConfig: LandingConfig,
};

const DetailCharacteristics = (props: DetailCharacteristicsProps) => {
  const { landingConfig } = props;

  const getElements = useCallback((text: FormatText, count: number) => {
    const elements = [] as FormatText[];
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
    return elements;
  }, []);

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
              { id: landingConfig.characteristics.details.text.id || 'productDetail.details' },
              landingConfig.characteristics.details.count
            )
          }
        />
        <CharacteristicsGroup
          title={{
            id: 'productDetail.includes.title',
          }}
          elements={
            getElements(
              { id: landingConfig.characteristics.includes.text.id || 'productDetail.includes' },
              landingConfig.characteristics.includes.count
            )
          }
        />
        <CharacteristicsGroup
          title={{
            id: 'productDetail.dimensions.title',
          }}
          elements={
            getElements(
              { id: landingConfig.characteristics.dimensions.text.id || 'productDetail.dimensions' },
              landingConfig.characteristics.dimensions.count
            )
          }
          source={ landingConfig.characteristics.dimensions.image ?
            {
              src: landingConfig.characteristics.dimensions.image,
            } : undefined
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

export default DetailCharacteristics;
