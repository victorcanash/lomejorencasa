import type { ThemeFontPropertyElement } from '@core/types/themes';

const typographies = {
  default: {
    textAlign: 'left',
    lineHeight: '26px',
    letterSpacing: '-0.33px',
  } as ThemeFontPropertyElement,
  title: {
    fontSize: '26px',
    fontWeight: '600',
    lineHeight: '30px',
  } as ThemeFontPropertyElement,
  secondTitle: {
    fontSize: '22px',
    fontWeight: '600',
    lineHeight: '28px',
  } as ThemeFontPropertyElement,
  contentHead: {
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '26px',
  } as ThemeFontPropertyElement,
  content: {
    fontSize: '14px',
    fontWeight: '300',
    lineHeight: '26px',
  } as ThemeFontPropertyElement,
  secondContentHead: {
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '26px',
  } as ThemeFontPropertyElement,
  secondContent: {
    fontSize: '12px',
    fontWeight: '300',
    lineHeight: '26px',
  } as ThemeFontPropertyElement,
  input: {
    fontSize: '14px',
    fontWeight: '300',
    lineHeight: '20px',
  } as ThemeFontPropertyElement,
  button: {
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '26px',
    textTransform: 'uppercase',
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
  categoryList: {
    name: {
      textAlign: 'center',
      fontSize: '14px',
      fontWeight: '500',
      lineHeight: '24px',
    } as ThemeFontPropertyElement,
  },
  landingList: {
    name: {
      fontSize: '14px',
      fontWeight: '300',
      lineHeight: '20.5px',
    } as ThemeFontPropertyElement,
    price: {
      origin: {
        fontSize: '12px',
        fontWeight: '500',
        lineHeight: '30px',
        textDecoration: 'line-through',
      } as ThemeFontPropertyElement,
      current: {
        fontSize: '16px',
        fontWeight: '600',
        lineHeight: '30px',
      } as ThemeFontPropertyElement,
    },
  },
  landingDetail: {
    price: {
      origin: {
        fontSize: '20px',
        fontWeight: '500',
        lineHeight: '30px',
        textDecoration: 'line-through',
      } as ThemeFontPropertyElement,
      current: {
        fontSize: '20px',
        fontWeight: '600',
        lineHeight: '30px',
      } as ThemeFontPropertyElement,
    },
  },
};

export default typographies;
