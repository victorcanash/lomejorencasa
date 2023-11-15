import { useState, useMemo, useCallback, type ChangeEvent } from 'react'

import { scrollToSection } from '@core/utils/navigation'

const usePagination = (
  items: unknown[],
  containerId: string,
  limitByPage = 40
) => {
  const [currentPage, setCurrentPage] = useState(1)

  const allItems = useMemo(() => {
    return items.slice((currentPage - 1) * limitByPage, currentPage * limitByPage)
  }, [currentPage, items, limitByPage])

  const totalPages = useMemo(() => {
    return Math.ceil(allItems.length / limitByPage)
  }, [allItems.length, limitByPage])

  const handleChangePage = useCallback((_event: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
    setTimeout(() => {
      scrollToSection(containerId, false)
    })
  }, [containerId])

  return {
    currentPage,
    allItems,
    totalPages,
    handleChangePage
  }
}

export default usePagination
