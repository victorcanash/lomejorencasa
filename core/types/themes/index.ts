export type ThemeElement = {
  backgroundColor?: ThemeColorElement,
  text?: {
    color?: ThemeColorElement,
    font?: ThemeFontElement,
  }
  fill?: ThemeColorElement,
  border?: ThemeBorderElement,
};

type ThemeColorElement = {
  default?: string,
  disabled?: string,
  hover?: string,
  focus?: string,
  even?: string,
  odd?: string,
  lastChild?: string,
};

type ThemeBorderElement = {
  default?: ThemeBorderPropertyElement,
  disabled?: ThemeBorderPropertyElement,
  hover?: ThemeBorderPropertyElement,
  focus?: ThemeBorderPropertyElement,
  even?: ThemeBorderPropertyElement,
  odd?: ThemeBorderPropertyElement,
  lastChild?: ThemeBorderPropertyElement,
};

type ThemeFontElement = {
  default?: ThemeFontPropertyElement,
  disabled?: ThemeFontPropertyElement,
  hover?: ThemeFontPropertyElement,
  focus?: ThemeFontPropertyElement,
  even?: ThemeFontPropertyElement,
  odd?: ThemeFontPropertyElement,
  lastChild?: ThemeFontPropertyElement,
};

type ThemeBorderPropertyElement = {
  border?: string,
  radius?: string,
};

type ThemeFontPropertyElement = {
  fontSize?: string,
  fontWeight?: string,
  textAlign?: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent',
  lineHeight?: string,
  letterSpacing?: string,
};
