import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  locales: ['pl', 'en'],
 
  defaultLocale: 'pl',
  pathnames: {
    '/': '/',
    '/projekty': {
      pl: '/projekty',
      en: '/projects',
    }
  },
});