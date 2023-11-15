import { useMemo } from 'react'
import { useRouter } from 'next/router'

import Container from '@mui/material/Container'

import ResendActivationForm from '@core/components/forms/auth/ResendActivationForm'

const ResendActivation = () => {
  const router = useRouter()

  const emailQuery = useMemo(() => {
    const { email } = router.query
    if (email != null && typeof email === 'string') {
      return email
    }
    return undefined
  }, [router.query])

  return (
    <Container>
      { (emailQuery != null) &&
        <ResendActivationForm email={emailQuery} />
      }
    </Container>
  )
}

export default ResendActivation
