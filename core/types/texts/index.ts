export type LocalizedText = {
  en: string,
  es: string,
  current: string,
};

export type FormatText = {
  id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values?:  any,
  textAlign?: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent',
};
