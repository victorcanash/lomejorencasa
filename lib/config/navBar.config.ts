import type { NavBarConfig } from '@core/types/navigation';
import { keywords } from '@lib/config/next-seo.config';

const navBarConfig: NavBarConfig = {
  homeH1: keywords.main,
  logo: {
    src: 'v1685641418/LO%20MEJOR%20EN%20CASA/IMAGOTIPO/IMAGOT%C3%8DPO-PNG_n8wvg8.png',
    width: {
      default: '220px',
      small: '165px',
    },
  },
};

export default navBarConfig;
