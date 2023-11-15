import { useRouter } from 'next/router'

import { FormattedMessage } from 'react-intl'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { AdminSections } from '@core/constants/admin'
import Divider from '@core/components/ui/Divider'
import Button from '@core/components/inputs/Button'

import { pages } from '@lib/config/navigation.config'

const HomeSection = () => {
  const router = useRouter()

  const onClickSectionBtn = (section: AdminSections) => {
    void router.push(`${pages.admin.path}?section=${section}`)
  }

  return (
    <>
      <Box>
        <Box sx={{ m: 2 }}>
          <Typography variant="h1" component="h2" gutterBottom>
            <FormattedMessage
              id="admin.check"
            />
          </Typography>
          <Button
            sx={{ m: 2 }}
            onClick={() => { onClickSectionBtn(AdminSections.checkStore) }}
          >
            <FormattedMessage
              id="admin.checkStoreBtn"
            />
          </Button>
        </Box>

        <Divider mt={3} mb={3} />

        <Box sx={{ m: 2 }}>
          <Typography variant="h1" component="h2" gutterBottom>
            <FormattedMessage
              id="admin.manageEmails"
            />
          </Typography>
          <Button
            sx={{ m: 2 }}
            onClick={() => { onClickSectionBtn(AdminSections.sendOrderEmail) }}
          >
            <FormattedMessage
              id="admin.sendOrderEmailBtn"
            />
          </Button>
        </Box>

        <Divider mt={3} mb={3} />

        <Box sx={{ m: 2 }}>
          <Typography variant="h1" component="h2" gutterBottom>
            <FormattedMessage
              id="admin.manageErrors"
            />
          </Typography>
          <Button
            sx={{ m: 2 }}
            onClick={() => { onClickSectionBtn(AdminSections.createFailedOrder) }}
          >
            <FormattedMessage
              id="admin.createFailedOrderBtn"
            />
          </Button>
          <Button
            sx={{ m: 2 }}
            onClick={() => { onClickSectionBtn(AdminSections.sendFailedOrderEmail) }}
          >
            <FormattedMessage
              id="admin.sendFailedOrderEmailBtn"
            />
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default HomeSection
