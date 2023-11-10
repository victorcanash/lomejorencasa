import type { FaqConfig } from '@core/types/faq'

import { pages } from '@lib/config/navigation.config'

const faqConfig: FaqConfig = [
  {
    title: {
      id: 'packing'
    },
    questions: [
      {
        text: {
          id: '1'
        },
        path: undefined
      },
      {
        text: {
          id: '2'
        },
        path: undefined
      },
      {
        text: {
          id: '3'
        },
        path: `${pages.vacuumBlog.path}#advantages`
      },
      {
        text: {
          id: '4'
        },
        path: `${pages.vacuumBlog.path}#use`
      },
      {
        text: {
          id: '5'
        },
        path: undefined
      },
      {
        text: {
          id: '6'
        },
        path: undefined
      },
      {
        text: {
          id: '7'
        },
        path: pages.vacuumBlog.path
      },
      {
        text: {
          id: '8'
        },
        path: undefined
      },
      {
        text: {
          id: '9'
        },
        path: undefined
      }
    ]
  },
  {
    title: {
      id: 'conservation'
    },
    questions: [
      {
        text: {
          id: '1'
        },
        path: `${pages.vacuumBlog.path}#conservation`
      },
      {
        text: {
          id: '2'
        },
        path: `${pages.vacuumBlog.path}#convervation`
      },
      {
        text: {
          id: '3'
        },
        path: `${pages.vacuumBlog.path}#conservation`
      },
      {
        text: {
          id: '4'
        },
        path: `${pages.vacuumBlog.path}#convervation`
      },
      {
        text: {
          id: '5'
        },
        path: `${pages.vacuumBlog.path}#convervation`
      },
      {
        text: {
          id: '6'
        },
        path: undefined
      },
      {
        text: {
          id: '7'
        },
        path: undefined
      },
      {
        text: {
          id: '8'
        },
        path: `${pages.vacuumBlog.path}#convervation`
      },
      {
        text: {
          id: '9'
        },
        path: undefined
      },
      {
        text: {
          id: '10'
        },
        path: `${pages.vacuumBlog.path}#convervation`
      }
    ]
  },
  {
    title: {
      id: 'shipping'
    },
    questions: [
      {
        text: {
          id: '1'
        },
        path: pages.conditions.path
      },
      {
        text: {
          id: '2'
        },
        path: pages.orders.path
      },
      {
        text: {
          id: '3'
        },
        path: pages.conditions.path
      }
    ]
  }
]

export default faqConfig
