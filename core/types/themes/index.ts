export type ThemeElement = {
  backgroundColor?: ThemeColorElement,
  text?: {
    color?: ThemeColorElement,
    font?: ThemeFontElement,
  }
  fill?: ThemeColorElement,
  border?: ThemeBorderElement,
};

export type ThemeColorElement = {
  default?: string,
  disabled?: string,
  hover?: string,
  focus?: string,
  even?: string,
  odd?: string,
  lastChild?: string,
};

export type ThemeBorderElement = {
  default?: string,
  disabled?: string,
  hover?: string,
  focus?: string,
  even?: string,
  odd?: string,
  lastChild?: string,
};

export type ThemeFontElement = {
  default?: ThemeFontPropertyElement,
  disabled?: ThemeFontPropertyElement,
  hover?: ThemeFontPropertyElement,
  focus?: ThemeFontPropertyElement,
  even?: ThemeFontPropertyElement,
  odd?: ThemeFontPropertyElement,
  lastChild?: ThemeFontPropertyElement,
};

export type ThemeFontPropertyElement = {
  fontSize?: string,
  fontWeight?: string,
  textAlign?: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent',
  lineHeight?: string,
  letterSpacing?: string,
};
