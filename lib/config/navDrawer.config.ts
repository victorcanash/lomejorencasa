import type { NavDrawerConfig } from '@core/types/navigation';
import { pages } from '@lib/config/navigation.config';

const navDrawerConfig: NavDrawerConfig = {
  main: [
    {
      text: {
        id: 'home',
      },
      path: pages.home.path,
      items: [],
    },
    {
      text: {
        id: 'shop',
      },
      items: [
        {
          text: {
            id: 'shop.all',
          },
          path: pages.products.path,
        },
        {
          text: {
            id: 'shop.offers',
          },
          path: pages.offers.path,
        },
        {
          text: {
            id: 'shop.news',
          },
          path: '/colecciones/novedades',
        },
        {
          text: {
            id: 'shop.featured',
          },
          path: '/colecciones/productos-destacados',
        },
        {
          text: {
            id: 'shop.summer',
          },
          path: '/colecciones/verano',
        },
        {
          text: {
            id: 'shop.home',
          },
          path: '/colecciones/hogar',
        },
        {
          text: {
            id: 'shop.wellness',
          },
          path: '/colecciones/bienestar',
        },
        {
          text: {
            id: 'shop.kitchen',
          },
          path: '/colecciones/cocina',
        },
        {
          text: {
            id: 'shop.gadget',
          },
          path: '/colecciones/gadget',
        },
      ],
    },
    {
      text: {
        id: 'orders',
      },
      path: pages.orders.path,
      items: [],
    },
    {
      text: {
        id: 'info',
      },
      items: [
        {
          text: {
            id: 'contact',
          },
          path: pages.contact.path,
        },
        {
          text: {
            id: 'resolutions',
          },
          path: pages.resolutions.path,
        },
        {
          text: {
            id: 'about',
          },
          path: pages.about.path,
        },
        {
          text: {
            id: 'faq',
          },
          path: pages.faq.path,
          divider: true,
        },
        {
          text: {
            id: 'vacuumBlog',
          },
          path: pages.vacuumBlog.path,
        },
        {
          text: {
            id: 'cbdBlog',
          },
          path: pages.cbdBlog.path,
        },
      ],
    },
  ],
  logged: [
    {
      text: {
        id: 'loggedProfile',
      },
      items: [
        {
          text: {
            id: 'settings',
          },
          path: pages.settings.path,
        },
        {
          text: {
            id: 'signOut',
          },
        },
      ],
    },
  ],
  unlogged: [
    {
      text: {
        id: 'unloggedProfile',
      },
      items: [
        {
          text: {
            id: 'signIn',
          },
          path: pages.login.path,
        },
        {
          text: {
            id: 'register',
          },
          path: pages.register.path,
        },
      ],
    },
  ],
};

export default navDrawerConfig;
