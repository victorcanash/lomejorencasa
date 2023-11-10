import type { ThemeTypographies } from '@core/types/themes'

const typographies: ThemeTypographies = {
  default: {
    textAlign: 'left',
    lineHeight: '26px',
    letterSpacing: '-0.33px'
  },
  title: {
    fontSize: '26px',
    fontWeight: '600',
    lineHeight: '30px'
  },
  secondTitle: {
    fontSize: '22px',
    fontWeight: '600',
    lineHeight: '28px'
  },
  contentHead: {
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '26px'
  },
  content: {
    fontSize: '14px',
    fontWeight: '300',
    lineHeight: '26px'
  },
  secondContentHead: {
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '26px'
  },
  secondContent: {
    fontSize: '12px',
    fontWeight: '300',
    lineHeight: '26px'
  },
  input: {
    fontSize: '14px',
    fontWeight: '300',
    lineHeight: '20px'
  },
  button: {
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '26px',
    textTransform: 'uppercase'
  },
  homeBanner: {
    default: {
      fontSize: '36px',
      fontWeight: '700',
      lineHeight: '42px',
      letterSpacing: '0.17px'
    },
    small: {
      fontSize: '33px',
      fontWeight: '700',
      lineHeight: '42px',
      letterSpacing: '0.17px'
    }
  },
  price: {
    origin: {
      fontSize: '20px',
      fontWeight: '500',
      lineHeight: '30px',
      textDecoration: 'line-through'
    },
    current: {
      fontSize: '20px',
      fontWeight: '600',
      lineHeight: '30px'
    }
  }
}

export default typographies
