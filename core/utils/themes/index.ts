import type { ThemeElement } from '@core/types/themes';

export const convertElementToSx= (themeElement: ThemeElement) => {
  return ({
    ...convertElementToEventSx(themeElement, 'default'),
    '&.Mui-disabled': convertElementToEventSx(themeElement, 'disabled'),
    '&:hover': convertElementToEventSx(themeElement, 'hover'),
    '&.Mui-focused': convertElementToEventSx(themeElement, 'focus'),
    '&:nth-of-type(even)': convertElementToEventSx(themeElement, 'even'),
    '&:nth-of-type(odd)': convertElementToEventSx(themeElement, 'odd'),
    '&:first-of-type': convertElementToEventSx(themeElement, 'firstChild'),
    '&:last-child': convertElementToEventSx(themeElement, 'lastChild'),
    '&:last-of-type': convertElementToEventSx(themeElement, 'lastChild'),
    '&:before': convertElementToEventSx(themeElement, 'before'),
  });
};

const convertElementToEventSx = (
  themeElement: ThemeElement,
  themeElementType: 'default' | 'disabled' | 'hover' | 'focus' | 'even' | 'odd' | 'firstChild' | 'lastChild' | 'before',
) => {
  return ({
    background: themeElement.background?.[themeElementType],
    backgroundColor: themeElement.backgroundColor?.[themeElementType],
    color: themeElement.text?.color?.[themeElementType],
    fontSize: themeElement.text?.font?.[themeElementType]?.fontSize,
    fontWeight: themeElement.text?.font?.[themeElementType]?.fontWeight,
    textAlign: themeElement.text?.font?.[themeElementType]?.textAlign,
    lineHeight: themeElement.text?.font?.[themeElementType]?.lineHeight,
    letterSpacing: themeElement.text?.font?.[themeElementType]?.letterSpacing,
    transform: themeElement.text?.font?.[themeElementType]?.textTransform,
    textDecoration: themeElement.text?.font?.[themeElementType]?.textDecoration,
    fill: themeElement.fill?.[themeElementType],
    border: themeElement.border?.[themeElementType]?.border,
    borderRadius: themeElement.border?.[themeElementType]?.radius?.all,
    borderTopRightRadius: themeElement.border?.[themeElementType]?.radius?.topRight,
    borderTopLeftRadius: themeElement.border?.[themeElementType]?.radius?.topLeft,
    borderBottomRightRadius: themeElement.border?.[themeElementType]?.radius?.bottomRight,
    borderBottomLeftRadius: themeElement.border?.[themeElementType]?.radius?.bottomLeft,
    padding: themeElement.spacing?.[themeElementType]?.padding?.all,
    paddingRight: themeElement.spacing?.[themeElementType]?.padding?.right,
    paddingLeft: themeElement.spacing?.[themeElementType]?.padding?.left,
    paddingTop: themeElement.spacing?.[themeElementType]?.padding?.top,
    paddingBottom: themeElement.spacing?.[themeElementType]?.padding?.bottom,
  });
};
