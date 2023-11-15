import { useMemo } from 'react'

import { useIntl, FormattedMessage } from 'react-intl'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import VisibilityIcon from '@mui/icons-material/Visibility'
import UpdateIcon from '@mui/icons-material/Update'

import type { CheckCategory, CheckCategoryGroup } from '@core/types/admin'
import type { ProductCategory } from '@core/types/products'

interface CheckCategoryDetailProps {
  checkCategory: CheckCategory | CheckCategoryGroup
  onClickSelectBtn: (checkCategory: CheckCategory) => void
  onClickUpdateBtn: (checkCategory: CheckCategory | CheckCategoryGroup) => void
}

const CheckCategoryDetail = (props: CheckCategoryDetailProps) => {
  const {
    checkCategory,
    onClickSelectBtn,
    onClickUpdateBtn
  } = props

  const intl = useIntl()

  const isGroup = useMemo(() => {
    if ((checkCategory as CheckCategory)?.category != null) {
      return false
    }
    return true
  }, [checkCategory])

  const modelCategory = useMemo(() => {
    if ((checkCategory as CheckCategory)?.category != null) {
      return (checkCategory as CheckCategory).category
    }
    return (checkCategory as CheckCategoryGroup).categoryGroup
  }, [checkCategory])

  return (
    <>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.id' })}: ${modelCategory.id}`}
      </Typography>
      { !isGroup &&
        <Typography component="div" variant="body1">
          {((modelCategory as ProductCategory).categoryGroupId != null)
            ? `${intl.formatMessage({ id: 'forms.categoryGroupId' })}: ${(modelCategory as ProductCategory).categoryGroupId}`
            : `${intl.formatMessage({ id: 'forms.withoutGroupCategoryName' })}`
          }
        </Typography>
      }
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.slug' })}: ${modelCategory.slug}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.name.en' })}: ${modelCategory.name.en}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.name.es' })}: ${modelCategory.name.es}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.description.en' })}: ${modelCategory.description.en}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.description.es' })}: ${modelCategory.description.es}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.image' })}: ${modelCategory.image}`}
      </Typography>

      { !isGroup &&
        <Button
          startIcon={<VisibilityIcon />}
          onClick={() => { onClickSelectBtn(checkCategory as CheckCategory) }}
        >
          <FormattedMessage
            id="admin.selectCategoryBtn"
          />
        </Button>
      }
      <Button
        startIcon={<UpdateIcon />}
        onClick={() => { onClickUpdateBtn(checkCategory) }}
      >
        <FormattedMessage
          id="admin.updateCategoryBtn"
        />
      </Button>
    </>
  )
}

export default CheckCategoryDetail
