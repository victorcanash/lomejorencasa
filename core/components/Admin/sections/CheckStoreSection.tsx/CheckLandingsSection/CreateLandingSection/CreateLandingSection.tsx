import { useState } from 'react'

import { FormattedMessage } from 'react-intl'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'

import { ManageActions } from '@core/constants/app'
import type {
  Landing,
  Product,
  ProductCategory,
  ProductDiscount,
  ProductInventory,
  ProductPack
} from '@core/types/products'
import useAdminStore from '@core/hooks/useAdminStore'
import Button from '@core/components/inputs/Button'
import ManageLandingForm from '@core/components/forms/admin/ManageLandingForm'
import ManageProductForm from '@core/components/forms/admin/ManageProductForm'
import ManagePPackForm from '@core/components/forms/admin/ManagePPackForm'
import ManagePInventoryForm from '@core/components/forms/admin/ManagePInventoryForm'
import ManagePDiscountForm from '@core/components/forms/admin/ManagePDiscountForm'
import CheckLandingDetail from '../CheckLandingDetail'
import CheckProductDetail from '../CheckLandingItemsDetail/CheckProductDetail'
import CheckProductPackDetail from '../CheckLandingItemsDetail/CheckProductPackDetail'

interface CreateLandingSectionProps {
  category: ProductCategory
  onSubmitSuccess: (landing: Landing) => void
  onCancel: () => void
}

const CreateLandingSection = (props: CreateLandingSectionProps) => {
  const {
    category,
    onSubmitSuccess,
    onCancel
  } = props

  const { createLanding, successMsg, errorMsg } = useAdminStore()

  const [landing, setLanding] = useState<Landing | undefined>(undefined)
  const [createProduct, setCreateProduct] = useState(false)
  const [createPack, setCreatePack] = useState(false)
  const [product, setProduct] = useState<Product | undefined>(undefined)
  const [pack, setPack] = useState<ProductPack | undefined>(undefined)

  const onSuccessCreateLanding = (newLanding: Landing) => {
    setLanding(newLanding)
  }

  const handleChooseProductBtn = () => {
    setCreateProduct(true)
  }

  const handleChoosePackBtn = () => {
    setCreatePack(true)
  }

  const onSuccessCreateProduct = (newProduct: Product) => {
    setProduct(newProduct)
  }

  const onSuccessCreatePack = (newPack: ProductPack) => {
    setPack(newPack)
  }

  const onCancelCreateProduct = () => {
    setCreateProduct(false)
  }

  const onCancelCreatePack = () => {
    setCreatePack(false)
  }

  const onSuccessCreateInventory = (inventory: ProductInventory) => {
    const newProduct: Product = {
      id: 0,
      landingId: 0,
      name: {
        en: '',
        es: '',
        current: ''
      },
      description: {
        en: '',
        es: '',
        current: ''
      },
      lowestPrice: 0,
      lowestRealPrice: 0,
      ...product,
      inventories: [
        ...product?.inventories ?? [],
        inventory
      ]
    }
    setProduct(newProduct)
  }

  const onCancelCreateInventory = () => {
    setProduct(undefined)
    setPack(undefined)
  }

  const onSuccessCreateDiscount = (discount: ProductDiscount) => {
    const newProduct: Product = {
      id: 0,
      landingId: 0,
      name: {
        en: '',
        es: '',
        current: ''
      },
      description: {
        en: '',
        es: '',
        current: ''
      },
      lowestPrice: 0,
      lowestRealPrice: 0,
      ...product,
      discounts: [
        ...product?.discounts ?? [],
        discount
      ]
    }
    setProduct(newProduct)
  }

  const onCancelCreateDiscount = () => {
    setProduct(undefined)
  }

  const onClickRemoveInventoryBtn = (index: number) => {
    if (product != null) {
      const newProduct: Product = {
        ...product,
        inventories: ((product?.inventories) != null) ? product.inventories.filter((_inventory, inventoryIndex) => inventoryIndex !== index) : []
      }
      setProduct(newProduct)
    } else if (pack != null) {
      const newPack: ProductPack = {
        ...pack,
        inventoriesIds: (pack?.inventoriesIds != null) ? pack.inventoriesIds.filter((_inventoryId, inventoryIndex) => inventoryIndex !== index) : []
      }
      setPack(newPack)
    }
  }

  const onClickRemoveDiscountBtn = (index: number) => {
    const newProduct: Product = {
      id: 0,
      landingId: 0,
      name: {
        en: '',
        es: '',
        current: ''
      },
      description: {
        en: '',
        es: '',
        current: ''
      },
      lowestPrice: 0,
      lowestRealPrice: 0,
      ...product,
      discounts: ((product?.discounts) != null) ? product.discounts.filter((_discount, discountIndex) => discountIndex !== index) : []
    }
    setProduct(newProduct)
  }

  const handleConfirmBtn = () => {
    if ((landing != null) && ((product != null) || (pack != null))) {
      void createLanding(landing, product, pack, onSubmitSuccess)
    }
  }

  return (
    <>
      {/* Views */}
      { (landing != null) &&
        <>
          <Typography component="div" variant="h2" textAlign="center" mt={2} mb={1}>
            <FormattedMessage
              id="admin.createdLanding"
            />
          </Typography>
          <CheckLandingDetail
            landing={landing}
            creating
          />
        </>
      }
      { (product != null) &&
        <>
          <Typography component="div" variant="h2" textAlign="center" mt={2} mb={1}>
            <FormattedMessage
              id="admin.createdProduct"
            />
          </Typography>
          <CheckProductDetail
            product={product}
            creating
            onClickRemoveInventoryBtn={onClickRemoveInventoryBtn}
            onClickRemoveDiscountBtn={onClickRemoveDiscountBtn}
          />
        </>
      }
      { (pack != null) &&
        <>
          <Typography component="div" variant="h2" textAlign="center" mt={2} mb={1}>
            <FormattedMessage
              id="admin.createdPack"
            />
          </Typography>
          <CheckProductPackDetail
            productPack={pack}
            creating
            onClickRemoveInventoryBtn={onClickRemoveInventoryBtn}
          />
        </>
      }

      {/* Create landing model */}
      { (landing == null) &&
        <ManageLandingForm
          action={ManageActions.create}
          onSubmitSuccess={onSuccessCreateLanding}
          onCancel={onCancel}
        />
      }

      {/* Choose item type */}
      { ((landing != null) && !createProduct && !createPack && (product == null) && (pack == null)) &&
        <Box mt={2}>
          <Button
            onClick={handleChooseProductBtn}
          >
            <FormattedMessage
              id="admin.createProductBtn"
            />
          </Button>
          <Button
            onClick={handleChoosePackBtn}
          >
            <FormattedMessage
              id="admin.createPackBtn"
            />
          </Button>
        </Box>
      }

      {/* Create product model */}
      { ((landing != null) && createProduct && !createPack && (product == null) && (pack == null)) &&
        <Box mt={2}>
          <ManageProductForm
            action={ManageActions.create}
            category={category}
            landing={landing}
            onSubmitSuccess={onSuccessCreateProduct}
            onCancel={onCancelCreateProduct}
          />
        </Box>
      }

      {/* Create pack model */}
      { ((landing != null) && !createProduct && createPack && (product == null) && (pack == null)) &&
        <Box mt={2}>
          <ManagePPackForm
            action={ManageActions.create}
            landing={landing}
            onSubmitSuccess={onSuccessCreatePack}
            onCancel={onCancelCreatePack}
          />
        </Box>
      }

      {/* Create inventories */}
      { ((landing != null) && createProduct && !createPack && (product != null) && (pack == null)) &&
        <>
          <Box mt={2}>
            <ManagePInventoryForm
              action={ManageActions.create}
              product={product}
              onSubmitSuccess={onSuccessCreateInventory}
              onCancel={onCancelCreateInventory}
            />
          </Box>
          <Box mt={2}>
            <ManagePDiscountForm
              action={ManageActions.create}
              product={product}
              onSubmitSuccess={onSuccessCreateDiscount}
              onCancel={onCancelCreateDiscount}
            />
          </Box>
        </>
      }

      { ((landing != null) && !createProduct && createPack && (product == null) && (pack != null)) &&
        <Button
          fullWidth
          onClick={onCancelCreateInventory}
        >
          <FormattedMessage
            id="app.cancelBtn"
          />
        </Button>
      }

      {/* Confirmation */}
      { ((landing != null) && (createProduct || createPack) && ((product != null) || (pack != null))) &&
        <Box mt={4}>
          <Button
            fullWidth
            onClick={handleConfirmBtn}
            disabled={
              ((product != null) && ((product.inventories == null) || product.inventories.length < 1)) ||
              ((pack != null) && (pack.inventoriesIds.length < 1))
            }
          >
            <FormattedMessage
              id="admin.confirmBtn"
            />
          </Button>
          {
            errorMsg !== '' &&
              <Alert severity="error">{ errorMsg }</Alert>
          }
          {
            successMsg !== '' &&
              <Alert>{ successMsg }</Alert>
          }
        </Box>
      }
    </>
  )
}

export default CreateLandingSection
