import type { LandingConfig } from '@core/types/products';

import { keywords } from '@lib/config/next-seo.config';

const inventoryConfig: {
  vacuumMachine: LandingConfig,
  vacuumBags: LandingConfig,
  vacuumPack: LandingConfig,
  vacuumBagsPack: LandingConfig,
} = {
  vacuumMachine: {
    id: 1,
    path: 'envasadora-al-vacio',
    metas: {
      title: keywords.vacuumMachine.main,
      imgsAlt: keywords.vacuumMachine.main,
    },
    comment: {
      id: 'everfresh.comment',
    },
    images: [
      'v1680715068/laenvasadora/LANDING%20PAGE/FOTO_4_duno3s.jpg',
      'v1682517395/laenvasadora/LANDING%20PAGE/FOTO_3_lzky3y_e7qbp2.jpg',
      'v1680726664/laenvasadora/LANDING%20PAGE/FOTO_5_g6vcri.jpg',
      'v1682517390/laenvasadora/LANDING%20PAGE/FOTO_1_yarwhg_vcukbn.jpg',
    ],
    characteristics: {
      details: {
        text: {
          id: 'everfresh.details',
        },
        count: 10,
      },
      includes: {
        text: {
          id: 'everfresh.includes',
        },
        count: 4,
      },
      dimensions: {
        text: {
          id: 'everfresh.dimensions',
        },
        count: 2,
      },
    },
    product: {
      inventories: [
        {
          name: {
            en: 'Everfresh vacuum machine',
            es: 'Envasadora al vacío Everfresh',
            current: 'Envasadora al vacío Everfresh',
          },
          price: 22.65,
          realPrice: 22.65,
          image: 'v1680715068/laenvasadora/LANDING%20PAGE/FOTO_4_duno3s.jpg',
        },
      ],
    },
  },
  vacuumBags: {
    id: 2,
    path: 'bolsas-para-envasadora-al-vacio',
    metas: {
      title: keywords.vacuumBags.main,
      imgsAlt: keywords.vacuumBags.main,
    },
    comment: {
      id: 'bags.comment',
    },
    images: [
      'v1682517414/laenvasadora/LANDING%20PAGE/Foto_bolsas_detalle_cuadrada_jcsiul_irxx9g.jpg',
      'v1682517407/laenvasadora/LANDING%20PAGE/bolsas_ayqf6k_hmc4ka.jpg',
      'v1680692777/laenvasadora/LANDING%20PAGE/Grafico-bolsas-letras-grandes_d8pl7r.jpg',
    ],
    characteristics: {
      details: {
        text: {
          id: 'bags.details',
        },
        count: 4,
      },
      includes: {
        text: {
          id: 'bags.includes',
        },
        count: 1,
      },
      dimensions: {
        text: {
          id: 'bags.dimensions',
        },
        count: 6,
        image: 'v1680692777/laenvasadora/LANDING%20PAGE/Grafico-bolsas-letras-grandes_d8pl7r.jpg',
      },
    },
    product: {
      selectInputTexts: {
        label: {
          id: 'forms.size',
        },
        content: {
          id: 'forms.selectInventory.bags',
        }   
      },
      inventories: [
        {
          name: {
            en: 'Box of 10 vacuum bags with valve (22cm x 21cm)',
            es: 'Paquete de 10 bolsas de vacío con válvula (22cm x 21cm)',
            current: 'Paquete de 10 bolsas de vacío con válvula (22cm x 21cm)',
          },
          price: 14.59,
          realPrice: 14.59,
          image: 'v1681818112/laenvasadora/LANDING%20PAGE/MARCA%20DE%20AGUA%20%28TAMA%C3%91OS%29/TAMA%C3%91O-XS_ercfwu.jpg',
        },
        {
          name: {
            en: 'Box of 10 vacuum bags with valve (26cm x 28cm)',
            es: 'Paquete de 10 bolsas de vacío con válvula (26cm x 28cm)',
            current: 'Paquete de 10 bolsas de vacío con válvula (26cm x 28cm)',
          },
          price: 15.57,
          realPrice: 15.57,
          image: 'v1681818112/laenvasadora/LANDING%20PAGE/MARCA%20DE%20AGUA%20%28TAMA%C3%91OS%29/TAMA%C3%91O-S_leboha.jpg',
        },
        {
          name: {
            en: 'Box of 10 vacuum bags with valve (22cm x 34cm)',
            es: 'Paquete de 10 bolsas de vacío con válvula (22cm x 34cm)',
            current: 'Paquete de 10 bolsas de vacío con válvula (22cm x 34cm)',
          },
          price: 16.07,
          realPrice: 16.07,
          image: 'v1681818112/laenvasadora/LANDING%20PAGE/MARCA%20DE%20AGUA%20%28TAMA%C3%91OS%29/TAMA%C3%91O-M_wzz69l.jpg',
        },
        {
          name: {
            en: 'Box of 10 vacuum bags with valve (26cm x 34cm)',
            es: 'Paquete de 10 bolsas de vacío con válvula (26cm x 34cm)',
            current: 'Paquete de 10 bolsas de vacío con válvula (26cm x 34cm)',
          },
          price: 17.07,
          realPrice: 17.07,
          image: 'v1681818112/laenvasadora/LANDING%20PAGE/MARCA%20DE%20AGUA%20%28TAMA%C3%91OS%29/TAMA%C3%91O-L_yoido7.jpg',
        },
        {
          name: {
            en: 'Box of 10 vacuum bags with valve (30cm x 34cm)',
            es: 'Paquete de 10 bolsas de vacío con válvula (30cm x 34cm)',
            current: 'Paquete de 10 bolsas de vacío con válvula (30cm x 34cm)',
          },
          price: 17.95,
          realPrice: 17.95,
          image: 'v1681818112/laenvasadora/LANDING%20PAGE/MARCA%20DE%20AGUA%20%28TAMA%C3%91OS%29/TAMA%C3%91O-XL_hxtzub.jpg',
        },
        {
          name: {
            en: 'Box of 10 vacuum bags with valve (2 x size)',
            es: 'Paquete de 10 bolsas de vacío con válvula (2 x size)',
            current: 'Paquete de 10 bolsas de vacío con válvula (2 x size)',
          },
          price: 16.07,
          realPrice: 16.07,
          image: 'v1681818112/laenvasadora/LANDING%20PAGE/MARCA%20DE%20AGUA%20%28TAMA%C3%91OS%29/TAMA%C3%91O-MIX_npqlem.jpg',
        },
      ],
    },
  },
  vacuumPack: {
    id: 3,
    path: 'pack-envasadora-al-vacio',
    metas: {
      title: keywords.vacuumMachine.main,
      imgsAlt: keywords.vacuumMachine.main,
    },
    comment: {
      id: 'everfresh.comment',
    },
    images: [
      'v1682580509/laenvasadora/LANDING%20PAGE/bundle%20pack%20envasadora%2Bbolsas/FOTO_2_fgnlnf_ihuykx.jpg',
      'v1680878929/laenvasadora/LANDING%20PAGE/bundle%20pack%20envasadora%2Bbolsas/FOTO_3_lzky3y.jpg',
      'v1680878418/laenvasadora/LANDING%20PAGE/bundle%20pack%20envasadora%2Bbolsas/bolsas_ayqf6k.jpg',
      'v1680726760/laenvasadora/LANDING%20PAGE/bundle%20pack%20envasadora%2Bbolsas/FOTO_1_yarwhg.jpg',
      'v1680692733/laenvasadora/LANDING%20PAGE/bundle%20pack%20envasadora%2Bbolsas/Foto_bolsas_detalle_cuadrada_jcsiul.jpg',
    ],
    characteristics: {
      details: {
        text: {
          id: 'everfresh.details',
        },
        count: 10,
      },
      includes: {
        text: {
          id: 'everfresh.includes',
        },
        count: 4,
      },
      dimensions: {
        text: {
          id: 'everfresh.dimensions',
        },
        count: 2,
      },
    },
    pack: {
      variations: [
        {
          name: {
            en: 'Everfresh vacuum machine + Box of 10 vacuum bags with valve (2 x size)',
            es: 'Envasadora al vacío Everfresh + Paquete de 10 bolsas de vacío con válvula (2 x tamaño)',
            current: 'Envasadora al vacío Everfresh + Paquete de 10 bolsas de vacío con válvula (2 x tamaño)',
          },
          price: 34.17,
          realPrice: 38.72,
          image: 'v1682580509/laenvasadora/LANDING%20PAGE/bundle%20pack%20envasadora%2Bbolsas/FOTO_2_fgnlnf_ihuykx.jpg',
        },
      ],
    },
  },
  vacuumBagsPack: {
    id: 4,
    path: 'pack-bolsas-para-envasadora-al-vacio',
    metas: {
      title: keywords.vacuumBags.main,
      imgsAlt: keywords.vacuumBags.main,
    },
    comment: {
      id: 'bags.comment',
    },
    images: [
      'v1682517414/laenvasadora/LANDING%20PAGE/Foto_bolsas_detalle_cuadrada_jcsiul_irxx9g.jpg',
      'v1682517407/laenvasadora/LANDING%20PAGE/bolsas_ayqf6k_hmc4ka.jpg',
      'v1680692777/laenvasadora/LANDING%20PAGE/Grafico-bolsas-letras-grandes_d8pl7r.jpg',
    ],
    characteristics: {
      details: {
        text: {
          id: 'bags.details',
        },
        count: 4,
      },
      includes: {
        text: {
          id: 'bagsPack.includes',
        },
        count: 1,
      },
      dimensions: {
        text: {
          id: 'bags.dimensions',
        },
        count: 6,
        image: 'v1680692777/laenvasadora/LANDING%20PAGE/Grafico-bolsas-letras-grandes_d8pl7r.jpg',
      },
    },
    pack: {
      name: {
        en: 'Pack of 20 vacuum bags with valve',
        es: 'Pack de 20 bolsas de vacío con válvula',
        current: 'Pack de 20 bolsas de vacío con válvula',
      },
      selectInputTexts: {
        label: {
          id: 'forms.size',
        },
        content: {
          id: 'forms.selectInventory.bags',
        }   
      },
      variations: [
        {
          name: {
            en: 'Pack of 20 vacuum bags with valve (22cm x 21cm)',
            es: 'Pack de 20 bolsas de vacío con válvula (22cm x 21cm)',
            current: 'Pack de 20 bolsas de vacío con válvula (22cm x 21cm)',
          },
          price: 20.53,
          realPrice: 29.18,
          image: 'v1681851571/laenvasadora/LANDING%20PAGE/MARCA%20DE%20AGUA%20%28TAMA%C3%91OS%29/20UNIDADES/TAMA%C3%91O-XS-20U_b313ir.jpg',
        },
        {
          name: {
            en: 'Pack of 20 vacuum bags with valve (26cm x 28cm)',
            es: 'Pack de 20 bolsas de vacío con válvula (26cm x 28cm)',
            current: 'Pack de 20 bolsas de vacío con válvula (26cm x 28cm)',
          },
          price: 22.49,
          realPrice: 31.14,
          image: 'v1681851570/laenvasadora/LANDING%20PAGE/MARCA%20DE%20AGUA%20%28TAMA%C3%91OS%29/20UNIDADES/TAMA%C3%91O-S-20U_kgjjpe.jpg',
        },
        {
          name: {
            en: 'Pack of 20 vacuum bags with valve (22cm x 34cm)',
            es: 'Pack de 20 bolsas de vacío con válvula (22cm x 34cm)',
            current: 'Pack de 20 bolsas de vacío con válvula (22cm x 34cm)',
          },
          price: 23.51,
          realPrice: 32.14,
          image: 'v1681851582/laenvasadora/LANDING%20PAGE/MARCA%20DE%20AGUA%20%28TAMA%C3%91OS%29/20UNIDADES/TAMA%C3%91O-M-20U_mcqulv.jpg',
        },
        {
          name: {
            en: 'Pack of 20 vacuum bags with valve (26cm x 34cm)',
            es: 'Pack de 20 bolsas de vacío con válvula (26cm x 34cm)',
            current: 'Pack de 20 bolsas de vacío con válvula (26cm x 34cm)',
          },
          price: 25.55,
          realPrice: 34.14,
          image: 'v1681851570/laenvasadora/LANDING%20PAGE/MARCA%20DE%20AGUA%20%28TAMA%C3%91OS%29/20UNIDADES/TAMA%C3%91O-L-20U_lx27eq.jpg',
        },
        {
          name: {
            en: 'Pack of 20 vacuum bags with valve (30cm x 34cm)',
            es: 'Pack de 20 bolsas de vacío con válvula (30cm x 34cm)',
            current: 'Pack de 20 bolsas de vacío con válvula (30cm x 34cm)',
          },
          price: 27.37,
          realPrice: 35.9,
          image: 'v1681851570/laenvasadora/LANDING%20PAGE/MARCA%20DE%20AGUA%20%28TAMA%C3%91OS%29/20UNIDADES/TAMA%C3%91O-XL-20U_w8bslc.jpg',
        },
        {
          name: {
            en: 'Pack of 20 vacuum bags with valve (2 x tamaño)',
            es: 'Pack de 20 bolsas de vacío con válvula (2 x tamaño)',
            current: 'Pack de 20 bolsas de vacío con válvula (2 x tamaño)',
          },
          price: 23.51,
          realPrice: 32.14,
          image: 'v1681851582/laenvasadora/LANDING%20PAGE/MARCA%20DE%20AGUA%20%28TAMA%C3%91OS%29/20UNIDADES/TAMA%C3%91O-MIX-20U_cuev1i.jpg',
        },
      ],
    },
  },
};

export default inventoryConfig;

export const allLandingConfigs: LandingConfig[] = [
  inventoryConfig.vacuumMachine,
  inventoryConfig.vacuumBags,
  inventoryConfig.vacuumPack,
  inventoryConfig.vacuumBagsPack,
];
