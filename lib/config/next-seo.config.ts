import envConfig from '@core/config/env.config';
import type { SeoConfig } from '@core/types/seo';

export const keywords = {
  main: 'Lomejorencasa',
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
    defaultTitle: keywords.main,
    additionalMetaTags: [{
      property: 'keywords',
      content: [
        keywords.main,
        keywords.vacuumMachine.main,
        keywords.vacuumMachine.others.join(','),
        keywords.vacuumBags.main,
        keywords.vacuumBags.others.join(','),
      ].join(','),
    }, {
      name: 'author',
      content: keywords.main,
    }],
    openGraph: {
      type: 'website',
      locale: 'es_ES',
      title: keywords.main,
      url: envConfig.APP_URL,
      siteName: keywords.main,
    },
  },
};

export default seoConfig;
