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
            id: 'bags',
          },
          path: pages.bags.path,
        },
        {
          text: {
            id: 'everfresh',
          },
          path: pages.everfresh.path,
        },
        {
          text: {
            id: 'bagsPack',
          },
          path: pages.bagsPack.path,
        },
        {
          text: {
            id: 'everfreshPack',
          },
          path: pages.everfreshPack.path,
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
