import type { NavBarConfig } from '@core/types/navigation';
import { keywords } from '@lib/config/next-seo.config';

const navBarConfig: NavBarConfig = {
  homeH1: keywords.vacuumMachine.main,
  logo: {
    src: 'v1683277258/laenvasadora/LOGOS/LOGO-NUEVO-NAVBAR-SPACE-GREY_rjnkl7.png',
    width: {
      default: '146px',
      small: '126px',
    },
  },
};

export default navBarConfig;
