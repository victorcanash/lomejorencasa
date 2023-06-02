export type ThemeElement = {
  background?: ThemeColorElement,
  backgroundColor?: ThemeColorElement,
  text?: {
    color?: ThemeColorElement,
    font?: ThemeFontElement,
  },
  fill?: ThemeColorElement,
  border?: ThemeBorderElement,
  spacing?: ThemeSpacingElement,
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
  before?: string,
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
  before?: ThemeBorderPropertyElement,
};

export type ThemeSpacingElement = {
  default?: ThemeSpacingPropertyElement,
  disabled?: ThemeSpacingPropertyElement,
  hover?: ThemeSpacingPropertyElement,
  focus?: ThemeSpacingPropertyElement,
  even?: ThemeSpacingPropertyElement,
  odd?: ThemeSpacingPropertyElement,
  firstChild?: ThemeSpacingPropertyElement,
  lastChild?: ThemeSpacingPropertyElement,
  before?: ThemeSpacingPropertyElement,
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
  before?: ThemeFontPropertyElement,
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

export type ThemeSpacingPropertyElement = {
  padding?: {
    all?: string | number,
    right?: string | number,
    left?: string | number,
    top?: string | number,
    bottom?: string | number,
  },
};

export type ThemeFontPropertyElement = {
  fontSize?: string,
  fontWeight?: string,
  textAlign?: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent',
  lineHeight?: string,
  letterSpacing?: string,
  textTransform?: string,
  textDecoration?: string,
};
