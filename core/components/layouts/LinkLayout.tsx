import { type ReactNode } from 'react'

import MainComponent from '@core/components/layouts/MainComponent'

const LinkLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <MainComponent>
        {children}
      </MainComponent>
    </>
  )
}

export default LinkLayout
