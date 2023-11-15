import type { FormatText } from '@core/types/texts'
import type { Source } from '@core/types/multimedia'
import type { NavItem } from '@core/types/navigation'

export interface HomeBannersConfig {
  allProducts: ProductBannerConfig
  seasonal: ProductBannerConfig
  offers: ProductBannerConfig
}

export interface ProductBannerConfig {
  height: string
  items: Array<{
    contentText: FormatText
    source: Source
    button: NavItem
  }>
}
