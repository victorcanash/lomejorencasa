import { useState } from 'react'

import { useIntl, FormattedMessage } from 'react-intl'
// import { Pagination } from 'swiper';
// import { Swiper, SwiperSlide } from 'swiper/react';

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import UpdateIcon from '@mui/icons-material/Update'
import Box from '@mui/material/Box'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { ManageActions } from '@core/constants/app'
import type { Landing, Product, ProductPack } from '@core/types/products'
// import CustomImage from '@core/components/CustomImage';
import ManageProductForm from '@core/components/forms/admin/ManageProductForm'
import ManagePPackForm from '@core/components/forms/admin/ManagePPackForm'
import CheckProductDetail from './CheckLandingItemsDetail/CheckProductDetail'
import CheckProductPackDetail from './CheckLandingItemsDetail/CheckProductPackDetail'

interface CheckLandingDetailProps {
  landing: Landing
  onClickUpdateBtn?: (landing: Landing) => void
  creating?: boolean
}

const CheckLandingDetail = (props: CheckLandingDetailProps) => {
  const {
    landing,
    onClickUpdateBtn,
    creating
  } = props

  const intl = useIntl()

  const [updateProduct, setUpdateProduct] = useState<Product | undefined>(undefined)
  const [updateProductPack, setUpdateProductPack] = useState<ProductPack | undefined>(undefined)

  const onClickUpdateProductBtn = (product: Product) => {
    setUpdateProduct(product)
  }

  const onClickUpdatePackBtn = (productPack: ProductPack) => {
    setUpdateProductPack(productPack)
  }

  const onSuccessUpdate = () => {
    setUpdateProduct(undefined)
    setUpdateProductPack(undefined)
  }

  const onSuccessDelete = () => {
    setUpdateProduct(undefined)
    setUpdateProductPack(undefined)
  }

  const onCancel = () => {
    setUpdateProduct(undefined)
    setUpdateProductPack(undefined)
  }

  return (
    <>
      { ((updateProduct == null) && (updateProductPack == null))
        ? <>
          { !(creating ?? false) &&
            <Typography component="div" variant="body1">
              {`${intl.formatMessage({ id: 'forms.id' })}: ${landing.id}`}
            </Typography>
          }
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.slug' })}: ${landing.slug}`}
          </Typography>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.name.en' })}: ${landing.name.en}`}
          </Typography>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.name.es' })}: ${landing.name.es}`}
          </Typography>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.description.en' })}: ${landing.description.en}`}
          </Typography>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.description.es' })}: ${landing.description.es}`}
          </Typography>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.images' })}:`}
          </Typography>
          <Box ml={2}>
            { landing.images.map((image, index) => (
              <Typography key={index} component="div" variant="body1">
                {image}
              </Typography>
            ))}
          </Box>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.tutorialSource' })}:`}
          </Typography>
          <Box ml={2}>
            { landing.tutorialSources.map((tutorialSource, index) => (
              <Typography key={index} component="div" variant="body1">
                {tutorialSource}
              </Typography>
            ))}
          </Box>
          {!(creating ?? false) &&
            <>
              <Typography component="div" variant="body1">
                {`${intl.formatMessage({ id: 'forms.rating' })}: ${landing.rating}`}
              </Typography>
              <Typography component="div" variant="body1">
                {`${intl.formatMessage({ id: 'forms.reviewsCount' })}: ${landing.reviewsCount}`}
              </Typography>

              <Button
                startIcon={<UpdateIcon />}
                onClick={(onClickUpdateBtn != null) ? () => { onClickUpdateBtn(landing) } : undefined}
              >
                <FormattedMessage
                  id="admin.updateLandingBtn"
                />
              </Button>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography>
                    <FormattedMessage id={landing.products != null && landing.products.length > 0 ? 'admin.products' : 'admin.packs'} />
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  { landing.products?.map((product) => (
                    <CheckProductDetail
                      key={product.id}
                      product={product}
                      creating={false}
                      onClickUpdateBtn={onClickUpdateProductBtn}
                    />
                  ))}
                  { landing.packs?.map((pack) => (
                    <CheckProductPackDetail
                      key={pack.id}
                      productPack={pack}
                      creating={false}
                      onClickUpdateBtn={onClickUpdatePackBtn}
                    />
                  ))}
                </AccordionDetails>
              </Accordion>
            </>
          }
        </>
        : <>
          { ((updateProduct != null) && (updateProductPack == null))
            ? <ManageProductForm
              action={ManageActions.update}
              landing={landing}
              product={updateProduct}
              onSubmitSuccess={onSuccessUpdate}
              onDeleteSuccess={onSuccessDelete}
              onCancel={onCancel}
            />
            : <ManagePPackForm
              action={ManageActions.update}
              landing={landing}
              productPack={updateProductPack}
              onSubmitSuccess={onSuccessUpdate}
              onDeleteSuccess={onSuccessDelete}
              onCancel={onCancel}
            />
          }
        </>
      }
    </>
  )
}

export default CheckLandingDetail
