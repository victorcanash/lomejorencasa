import { type ReactNode } from 'react'

import { AdminProvider } from '@core/contexts/AdminContext'
import MainComponent from '@core/components/layouts/MainComponent'
import NavBar from '@core/components/NavBar'

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AdminProvider>
      <NavBar />
      <MainComponent>
        {children}
      </MainComponent>
    </AdminProvider>
  )
}

export default AdminLayout
