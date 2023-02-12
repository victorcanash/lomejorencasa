import { PageTypes } from '@core/constants/navigation';
import { Protections } from '@core/constants/auth';
import type { FormatText } from '@core/types/texts';

export type Page = {
  path: string,
  filepath: string,
  protection: Protections,
  type: PageTypes,
  savePathOnLogin: {
    enabled: boolean,
    path?: string,
  },
  redirectPathOnProtected?: string,
  redirectPathOnLogout?: string,
};

export type NavItem = {
  path?: string,
  text: FormatText,
};

export type DrawerItems = NavItem & {
  items: NavItem[],
  open: boolean,
};
