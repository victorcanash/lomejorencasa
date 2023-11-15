import { FormattedMessage } from 'react-intl'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import { AdminSections } from '@core/constants/admin'
import Divider from '@core/components/ui/Divider'

import { useAdminContext } from '@core/contexts/AdminContext'
import Button from '@core/components/inputs/Button'
import HomeSection from '@core/components/Admin/sections/HomeSection'
import CheckStoreSection from '@core/components/Admin/sections/CheckStoreSection.tsx'
import CreateFailedOrderSection from '@core/components/Admin/sections/CreateFailedOrderSection'
import SendFailedOrderEmailSection from '@core/components/Admin/sections/SendFailedOrderEmailSection'
import SendOrderEmailSection from '@core/components/Admin/sections/SendOrderEmailSection'

const Admin = () => {
  const {
    section
  } = useAdminContext()

  return (
    <Container>
      { section === AdminSections.home
        ? <Typography component="h1" variant="h1">
          <FormattedMessage id="admin.h1" />
        </Typography>
        : <Button customtype="back" />
      }
      <Divider mt={1} mb={4} />
      { section === AdminSections.home &&
        <HomeSection />
      }
      { section === AdminSections.checkStore &&
        <CheckStoreSection />
      }
      { section === AdminSections.createFailedOrder &&
        <CreateFailedOrderSection />
      }
      { section === AdminSections.sendFailedOrderEmail &&
        <SendFailedOrderEmailSection />
      }
      { section === AdminSections.sendOrderEmail &&
        <SendOrderEmailSection />
      }
    </Container>
  )
}

export default Admin
