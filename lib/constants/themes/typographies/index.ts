import type { ThemeFontPropertyElement } from '@core/types/themes';

const typographies = {
  default: {
    textAlign: 'left',
    lineHeight: '26px',
    letterSpacing: '-0.33px',   
  } as ThemeFontPropertyElement,
  title: {
    fontSize: '24px',
    fontWeight: '500',
    lineHeight: '30px',
  } as ThemeFontPropertyElement,
  secondTitle: {
    fontSize: '20px',
    fontWeight: '500',
    lineHeight: '28px',
  } as ThemeFontPropertyElement,
  content: {
    fontSize: '14px',
    fontWeight: '300',
    lineHeight: '26px',
  } as ThemeFontPropertyElement,
  secondContent: {
    fontSize: '12px',
    fontWeight: '300',
    lineHeight: '26px',
  } as ThemeFontPropertyElement,
  button: {
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '26px',
    textTransform: 'uppercase',
  } as ThemeFontPropertyElement,
  headerBanner: {
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '26px',
    textAlign: 'center',
    textTransform:'uppercase',
  } as ThemeFontPropertyElement,
  homeBanner: {
    default: {
      fontSize: '36px',
      fontWeight: '700',
      lineHeight: '42px',
      letterSpacing: '0.17px',
    } as ThemeFontPropertyElement,
    small: {
      fontSize: '33px',
      fontWeight: '700',
      lineHeight: '42px',
      letterSpacing: '0.17px',
    } as ThemeFontPropertyElement,
  },
};

export default typographies;
