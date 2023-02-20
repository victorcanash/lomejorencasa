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
  firstChild?: string,
  lastChild?: string,
};

export type ThemeBorderElement = {
  default?: ThemeBorderPropertyElement,
  disabled?: ThemeBorderPropertyElement,
  hover?: ThemeBorderPropertyElement,
  focus?: ThemeBorderPropertyElement,
  even?: ThemeBorderPropertyElement,
  odd?: ThemeBorderPropertyElement,
  firstChild?: ThemeBorderPropertyElement,
  lastChild?: ThemeBorderPropertyElement,
};

export type ThemeFontElement = {
  default?: ThemeFontPropertyElement,
  disabled?: ThemeFontPropertyElement,
  hover?: ThemeFontPropertyElement,
  focus?: ThemeFontPropertyElement,
  even?: ThemeFontPropertyElement,
  odd?: ThemeFontPropertyElement,
  firstChild?: ThemeFontPropertyElement,
  lastChild?: ThemeFontPropertyElement,
};

export type ThemeBorderPropertyElement = {
  border?: string,
  radius?: {
    all?: string,
    topRight?: string,
    topLeft?: string,
    bottomRight?: string,
    bottomLeft?: string,
  },
};

export type ThemeFontPropertyElement = {
  fontSize?: string,
  fontWeight?: string,
  textAlign?: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent',
  lineHeight?: string,
  letterSpacing?: string,
};
