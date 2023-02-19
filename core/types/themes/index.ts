export type ThemeElement = {
  background?: ThemeColorElement,
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
  default?: ThemeBorderPropertyElement,
  disabled?: ThemeBorderPropertyElement,
  hover?: ThemeBorderPropertyElement,
  focus?: ThemeBorderPropertyElement,
  even?: ThemeBorderPropertyElement,
  odd?: ThemeBorderPropertyElement,
  lastChild?: ThemeBorderPropertyElement,
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

export type ThemeBorderPropertyElement = {
  border?: string,
  radius?: string,
};

export type ThemeFontPropertyElement = {
  fontSize?: string,
  fontWeight?: string,
  textAlign?: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent',
  lineHeight?: string,
  letterSpacing?: string,
};
