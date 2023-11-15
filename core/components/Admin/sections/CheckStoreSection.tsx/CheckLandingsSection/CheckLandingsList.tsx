import { Fragment } from 'react'

import Box from '@mui/material/Box'

import type { CheckCategory } from '@core/types/admin'
import type { Landing } from '@core/types/products'
import CheckLandingDetail from './CheckLandingDetail'

interface CheckLandingsListProps {
  checkCategory: CheckCategory
  onClickUpdateBtn: (landing: Landing) => void
}

const CheckLandingsList = (props: CheckLandingsListProps) => {
  const {
    checkCategory,
    onClickUpdateBtn
  } = props

  return (
    <>
      { checkCategory.landings.map((landing) => (
        <Fragment key={landing.id}>
          <Box mt={3} />
          <CheckLandingDetail
            landing={landing}
            onClickUpdateBtn={onClickUpdateBtn}
          />
        </Fragment>
      ))}
    </>
  )
}

export default CheckLandingsList
