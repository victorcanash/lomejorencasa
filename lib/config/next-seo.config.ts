import { DefaultSeoProps } from 'next-seo';

import envConfig from '@core/config/env.config';

export const keywords = {
  vacuumMachine: {
    main: 'Envasadora al Vacío',
    others: [
      'Máquina de Vacío',
      'Selladora de Alimentos',
    ],
  },
  vacuumBags: {
    main: 'Bolsas para Envasadora al Vacío',
    others: [
      'Bolsas de Vacío con Válvula',
    ],
  },
};

const config: DefaultSeoProps = {
  defaultTitle: keywords.vacuumMachine.main,
  additionalMetaTags: [{
    property: 'keywords',
    content: [
      keywords.vacuumMachine.main,
      keywords.vacuumMachine.others.join(','),
      keywords.vacuumBags.main,
      keywords.vacuumBags.others.join(','),
    ].join(','),
  }, {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1.0'
  }, {
    name: 'author',
    content: keywords.vacuumMachine.main,
  }],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    title: keywords.vacuumMachine.main,
    url: envConfig.NEXT_PUBLIC_APP_URL,
    siteName: keywords.vacuumMachine.main,
  },
};

export default config;
