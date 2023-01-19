import { Protections } from '@core/constants/auth';
import { PageTypes } from '@core/constants/navigation';

export type Page = {
  path: string,
  filepath: string,
  protection: Protections,
  type: PageTypes,
};
