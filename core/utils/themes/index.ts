import type { ThemeElement, ThemeFontElement, ThemeFontPropertyElement } from '@core/types/themes';

export const convertElementToSx = (themeElement: ThemeElement) => {
  return ({
    ...convertElementToEventSx(themeElement, 'default'),
    '&.Mui-disabled': convertElementToEventSx(themeElement, 'disabled'),
    '&:hover': convertElementToEventSx(themeElement, 'hover'),
    '&.Mui-focused': convertElementToEventSx(themeElement, 'focus'),
    '&:nth-of-type(even)': convertElementToEventSx(themeElement, 'even'),
    '&:nth-of-type(odd)': convertElementToEventSx(themeElement, 'odd'),
    '&:last-child td, &:last-child th': convertElementToEventSx(themeElement, 'lastChild'),
  });
};

export const convertFontElementToSx = (fontElement: ThemeFontPropertyElement) => {
  return ({
    ...convertFontElementToEventSx(fontElement, 'default'),
  });
};

const convertElementToEventSx = (
  themeElement: ThemeElement,
  themeElementType: 'default' | 'disabled' | 'hover' | 'focus' | 'even' | 'odd' | 'lastChild',
) => {
  const fontCssProperties = themeElement.text?.font ? 
    convertFontElementToEventSx(themeElement.text?.font, themeElementType) : {};
  return (
    {
      backgroundColor: themeElement.backgroundColor?.[themeElementType],
      color: themeElement.text?.color?.[themeElementType],
      ...fontCssProperties,
      fill: themeElement.fill?.[themeElementType],
      border: themeElement.border?.[themeElementType],
    }
  );
};

const convertFontElementToEventSx = (
  fontElement: ThemeFontElement | ThemeFontPropertyElement,
  themeElementType: 'default' | 'disabled' | 'hover' | 'focus' | 'even' | 'odd' | 'lastChild',
) => {
  const propertyElement = (fontElement as ThemeFontElement)?.default ? 
    (fontElement as ThemeFontElement)[themeElementType] : fontElement as ThemeFontPropertyElement;
  return (
    {
      fontSize: propertyElement?.fontSize,
      fontWeight: propertyElement?.fontWeight,
      textAlign: propertyElement?.textAlign,
      lineHeight: propertyElement?.lineHeight,
      letterSpacing: propertyElement?.letterSpacing,
    }
  );
};
