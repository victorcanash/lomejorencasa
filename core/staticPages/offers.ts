import type { GetStaticProps } from 'next';

import type { Landing } from '@core/types/products';
import { getAllLandings } from '@core/utils/products';

export type OffersPageProps = {
  landings: Landing[],
};

export const getOffersStaticProps: GetStaticProps = async () => {
  let landings: Landing[] = [];
  await getAllLandings(true, true)
    .then((response) => {
      landings = response.landings;
    })
    .catch((error) => {
      throw error;
    });

  return {
    props: {
      landings: landings,
    } as OffersPageProps,
  };
};
