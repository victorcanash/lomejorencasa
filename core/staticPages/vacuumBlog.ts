import type { GetStaticProps } from 'next';

import type { Landing } from '@core/types/products';
import { getLanding } from '@core/utils/products';

export type VacuumBlogPageProps = {
  landingVacuumMachine: Landing,
  landingVacuumBags: Landing,
};

export const getVacuumBlogStaticProps: GetStaticProps = async () => {
  let landingVacuumMachine: Landing = {} as Landing;
  let landingVacuumBags: Landing = {} as Landing;
  await getLanding('envasadora-al-vacio-everfresh')
    .then((response) => {
      landingVacuumMachine = response.landing;
    })
    .catch((error) => {
      throw error;
    });
  await getLanding('bolsas-de-vacio-tm-electron')
    .then((response) => {
      landingVacuumBags = response.landing;
    })
    .catch((error) => {
      throw error;
    });

  return {
    props: {
      landingVacuumMachine,
      landingVacuumBags,
    } as VacuumBlogPageProps,
  };
};
