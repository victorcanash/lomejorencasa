export const productPaths = {
  everfresh: 'envasadora-al-vacio',
  bags: 'bolsas-para-envasadora-al-vacio',
};

export const allProductPaths = [
  productPaths.everfresh,
  productPaths.bags,
];

export const productIds = {
  everfresh: 1,
  bags: 3,
};

export const inventoryIds = {
  everfresh: 1,
  bagsXS: 6,
  bagsS: 7,
  bagsM: 8,
  bagsL: 9,
  bagsXL: 10,
  bagsMIX: 11,
}

export const packIds = {
  everfresh: 1,
  bagsXS: 2,
  bagsS: 3,
  bagsM: 4,
  bagsL: 5,
  bagsXL: 6,
  bagsMIX: 7,
};

export const allProductIds: number[] | undefined = [
  productIds.everfresh,
  productIds.bags,
];

export const allPackIds: number[] | undefined = [
  packIds.everfresh,
  packIds.bagsXS,
  packIds.bagsS,
  packIds.bagsM,
  packIds.bagsL,
  packIds.bagsXL,
  packIds.bagsMIX,
];
