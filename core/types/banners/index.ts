import type { FormatText } from '@core/types/texts';
import type { Source } from '@core/types/multimedia';
import type { NavItem } from '@core/types/navigation';

export type HomeBannersConfig = {
  allProducts: ProductBannerConfig,
  seasonal: ProductBannerConfig,
  offers: ProductBannerConfig,
};

export type ProductBannerConfig = {
  items: {
    contentText: FormatText,
    source: Source,
    button: NavItem,
  }[],
};
