import es from './es.json';
import landingEs from './landingEs.json';

const esObj = {
  ...es,
  ...landingEs,
};

export const messages = {
  en: esObj,
  es: esObj,
};
