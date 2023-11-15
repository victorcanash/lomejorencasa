import { type PageTypes } from '@core/constants/navigation'
import { type Protections } from '@core/constants/auth'
import type { FormatText } from '@core/types/texts'

export interface NavBarConfig {
  homeH1: string
  logo: {
    src: string
    alt?: string
    width: {
      default: string
      small: string
    }
  }
}

export interface NavDrawerConfig {
  main: NavDrawerItem[]
  logged: NavDrawerItem[]
  unlogged: NavDrawerItem[]
}

export interface Page {
  path: string
  filepath: string
  protection: Protections
  type: PageTypes
  savePathOnLogin: {
    enabled: boolean
    path?: string
  }
  redirectPathOnProtected?: string
  redirectPathOnLogout?: string
}

export interface NavItem {
  path?: string
  text: FormatText
}

export type NavDrawerItem = NavItem & {
  items: Array<NavItem & {
    divider?: boolean
  }>
  open?: boolean
}
