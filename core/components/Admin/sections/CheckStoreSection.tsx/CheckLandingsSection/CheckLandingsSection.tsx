import { useState } from 'react'

import { FormattedMessage } from 'react-intl'

import Typography from '@mui/material/Typography'
import CreateIcon from '@mui/icons-material/Create'

import { ManageActions } from '@core/constants/app'
import type { CheckCategory } from '@core/types/admin'
import type { Landing } from '@core/types/products'
import Button from '@core/components/inputs/Button'
import Divider from '@core/components/ui/Divider'
import ManageLandingForm from '@core/components/forms/admin/ManageLandingForm'
import CheckLandingsList from './CheckLandingsList'
import CreateLandingSection from './CreateLandingSection'

interface CheckLandingsSectionProps {
  checkCategory: CheckCategory
  onClickBack: () => void
}

const CheckLandingsSection = (props: CheckLandingsSectionProps) => {
  const {
    checkCategory,
    onClickBack
  } = props

  const [updateLanding, setUpdateLanding] = useState<Landing | undefined>(undefined)
  const [createLanding, setCreateLanding] = useState(false)

  const onClickCreateBtn = () => {
    setCreateLanding(true)
  }

  const onClickUpdateBtn = (landing: Landing) => {
    setUpdateLanding(landing)
  }

  const onSuccessCreate = () => {
    setCreateLanding(false)
  }

  const onSuccessUpdate = () => {
    setUpdateLanding(undefined)
  }

  const onSuccessDelete = () => {
    setUpdateLanding(undefined)
  }

  const onCancel = () => {
    setUpdateLanding(undefined)
    setCreateLanding(false)
  }

  return (
    <>
      <Typography component="div" variant="h2">
        {checkCategory.category.name.current}
      </Typography>
      <Typography component="div" variant="h3">
        {checkCategory.category.description.current}
      </Typography>
      <Button customtype="back" onClick={onClickBack}>
        <FormattedMessage id="admin.productCategoriesBack" />
      </Button>
      <Divider mt={1} mb={4} />

      { ((updateLanding == null) && !createLanding) &&
        <>
          <Button
            startIcon={<CreateIcon />}
            onClick={() => { onClickCreateBtn() }}
          >
            <FormattedMessage
              id="admin.createLandingBtn"
            />
          </Button>
          <CheckLandingsList
            checkCategory={checkCategory}
            onClickUpdateBtn={onClickUpdateBtn}
          />
        </>
      }

      { ((updateLanding != null) && !createLanding) &&
        <ManageLandingForm
          action={ManageActions.update}
          landing={updateLanding}
          onSubmitSuccess={onSuccessUpdate}
          onDeleteSuccess={onSuccessDelete}
          onCancel={onCancel}
        />
      }

      { ((updateLanding == null) && createLanding) &&
        <CreateLandingSection
          category={checkCategory.category}
          onSubmitSuccess={onSuccessCreate}
          onCancel={onCancel}
        />
      }
    </>
  )
}

export default CheckLandingsSection
