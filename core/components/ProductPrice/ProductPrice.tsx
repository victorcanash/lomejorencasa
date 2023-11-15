import { useMemo } from 'react'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { convertElementToSx } from '@core/utils/themes'
import { useAuthContext } from '@core/contexts/AuthContext'
import { themeCustomElements } from '@lib/config/theme/elements'

interface ProductPriceProps {
  type: 'landingDetail' | 'landingList'
  price: number
  originPrice: number
}

const ProductPrice = (props: ProductPriceProps) => {
  const {
    type,
    price,
    originPrice
  } = props

  const { convertPriceToString } = useAuthContext()

  const themeTexts = useMemo(() => {
    let texts = {
      currentPrice: themeCustomElements.landingDetail?.price?.currentText,
      originPrice: themeCustomElements.landingDetail?.price?.originText
    }
    if (type === 'landingList') {
      texts = {
        currentPrice: themeCustomElements.landingList?.price?.currentText,
        originPrice: themeCustomElements.landingList?.price?.originText
      }
    }
    return texts
  }, [type])

  return (
    <Typography
      component={type === 'landingDetail' ? 'h2' : 'div'}
      variant={type === 'landingDetail' ? 'h2' : 'body1Head'}
      sx={{
        ...(themeTexts.currentPrice != null)
          ? convertElementToSx(themeTexts.currentPrice)
          : undefined
      }}
    >
      { price !== originPrice
        ? <>
          <Box
            component="span"
            sx={{
              ...(themeTexts.originPrice != null)
                ? convertElementToSx(themeTexts.originPrice)
                : undefined,
              color: (themeTexts.currentPrice != null)
                ? convertElementToSx(themeTexts.currentPrice).color
                : undefined
            }}
          >
            <Box
              component="span"
              sx={{
                color: (themeTexts.originPrice != null)
                  ? convertElementToSx(themeTexts.originPrice).color
                  : undefined
              }}
            >
              {`${convertPriceToString(originPrice)}`}
            </Box>
          </Box>
          {` ${convertPriceToString(price)}`}
        </>
        : <>
          {`${convertPriceToString(price)}`}
        </>
      }
    </Typography>
  )
}

export default ProductPrice
