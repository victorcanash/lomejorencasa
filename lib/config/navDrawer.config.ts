import type { NavDrawerConfig } from '@core/types/navigation'
import { pages } from '@lib/config/navigation.config'

const navDrawerConfig: NavDrawerConfig = {
  main: [
    {
      text: {
        id: 'home'
      },
      path: pages.home.path,
      items: []
    },
    {
      text: {
        id: 'all'
      },
      path: pages.products.path,
      items: []
    },
    {
      text: {
        id: 'offers'
      },
      path: pages.offers.path,
      items: []
    },
    {
      text: {
        id: 'summer'
      },
      path: '/colecciones/verano',
      items: []
    },
    {
      text: {
        id: 'categories'
      },
      items: [
        {
          text: {
            id: 'categories.home'
          },
          path: '/colecciones/hogar'
        },
        {
          text: {
            id: 'categories.wellness'
          },
          path: '/colecciones/bienestar'
        },
        {
          text: {
            id: 'categories.kitchen'
          },
          path: '/colecciones/cocina'
        },
        {
          text: {
            id: 'categories.gadget'
          },
          path: '/colecciones/gadget'
        }
      ]
    },
    {
      text: {
        id: 'orders'
      },
      path: pages.orders.path,
      items: []
    },
    {
      text: {
        id: 'info'
      },
      items: [
        {
          text: {
            id: 'contact'
          },
          path: pages.contact.path
        },
        {
          text: {
            id: 'resolutions'
          },
          path: pages.resolutions.path
        },
        {
          text: {
            id: 'about'
          },
          path: pages.about.path
        },
        {
          text: {
            id: 'faq'
          },
          path: pages.faq.path,
          divider: true
        },
        {
          text: {
            id: 'vacuumBlog'
          },
          path: pages.vacuumBlog.path
        }
      ]
    }
  ],
  logged: [
    {
      text: {
        id: 'loggedProfile'
      },
      items: [
        {
          text: {
            id: 'settings'
          },
          path: pages.settings.path
        },
        {
          text: {
            id: 'signOut'
          }
        }
      ]
    }
  ],
  unlogged: [
    {
      text: {
        id: 'unloggedProfile'
      },
      items: [
        {
          text: {
            id: 'signIn'
          },
          path: pages.login.path
        },
        {
          text: {
            id: 'register'
          },
          path: pages.register.path
        }
      ]
    }
  ]
}

export default navDrawerConfig
