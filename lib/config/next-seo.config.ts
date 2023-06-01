import envConfig from '@core/config/env.config';
import type { SeoConfig } from '@core/types/seo';

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

const seoConfig: SeoConfig = {
  defaultSeoProps: {
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
      name: 'author',
      content: keywords.vacuumMachine.main,
    }],
    openGraph: {
      type: 'website',
      locale: 'es_ES',
      title: keywords.vacuumMachine.main,
      url: envConfig.APP_URL,
      siteName: keywords.vacuumMachine.main,
    },
  },
  home: {
    h1: keywords.vacuumMachine.main,
  },
};

export default seoConfig;
