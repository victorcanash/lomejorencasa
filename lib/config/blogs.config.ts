import type { BlogsConfig } from '@core/types/blogs';

import { pages } from '@lib/config/navigation.config';

const blogsConfig: BlogsConfig = [
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

export default blogsConfig;
