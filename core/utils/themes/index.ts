import type { ThemeElement } from '@core/types/themes';

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

const convertElementToEventSx = (
  themeElement: ThemeElement,
  themeElementType: 'default' | 'disabled' | 'hover' | 'focus' | 'even' | 'odd' | 'lastChild',
) => {
  return (
    {
      background: themeElement.background?.[themeElementType],
      backgroundColor: themeElement.backgroundColor?.[themeElementType],
      color: themeElement.text?.color?.[themeElementType],
      fontSize: themeElement.text?.font?.[themeElementType]?.fontSize,
      fontWeight: themeElement.text?.font?.[themeElementType]?.fontWeight,
      textAlign: themeElement.text?.font?.[themeElementType]?.textAlign,
      lineHeight: themeElement.text?.font?.[themeElementType]?.lineHeight,
      letterSpacing: themeElement.text?.font?.[themeElementType]?.letterSpacing,
      fill: themeElement.fill?.[themeElementType],
      border: themeElement.border?.[themeElementType]?.border,
      borderRadius: themeElement.border?.[themeElementType]?.radius,
    }
  );
};
