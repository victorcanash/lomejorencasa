import { Protections } from '@core/constants/auth';
import { PageTypes } from '@core/constants/navigation';

export type Page = {
  path: string,
  filepath: string,
  protection: Protections,
  type: PageTypes,
  savePathOnLogin: {
    enabled: boolean,
    path?: string,
  }
};

export type NavItem = {
  path?: string,
  textId: string,
};

export type DrawerItems = NavItem & {
  items: NavItem[],
  open: boolean,
};
