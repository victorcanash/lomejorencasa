import { useRef, useEffect, useCallback } from 'react'

import useForms from '@core/hooks/useForms'

const useApp = () => {
  const { initForms } = useForms()

  const firstRenderRef = useRef(false)

  const initData = useCallback(async () => {
    initForms()
  }, [initForms])

  useEffect(() => {
    if (!firstRenderRef.current) {
      firstRenderRef.current = true
      void initData()
    }
  }, [initData])

  return {}
}

export default useApp
