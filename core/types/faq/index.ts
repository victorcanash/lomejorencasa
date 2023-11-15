import type { NavItem } from '@core/types/navigation'
import type { FormatText } from '@core/types/texts'

export type FaqConfig = FaqGroup[]

export interface FaqGroup {
  title: FormatText
  questions: NavItem[]
}
