import type { NavItem } from '@core/types/navigation';

import { pages } from 'lib/constants/navigation';

const blogs: NavItem[] = [
  {
    text: { 
      id: 'home.intro.title',
    },
    path: pages.vacuumBlog.path,
  },
  {
    text: { 
      id: 'cbdBlog.h1',
    },
    path: pages.cbdBlog.path,
  },
];

export default blogs;
