'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { useGeneralContext } from '../GeneralProductProvider'
import { useSearchParams } from 'next/navigation'

export default function PaginationDataTable() {
  const { pages, currentPage } = useGeneralContext()
  const searchParams = useSearchParams()
  const query = Object.fromEntries(searchParams.entries())
  const maxVisiblePages = 5

  const createQueryString = (page: number) => ({ ...query, current: page })

  const RenderPageLink = (page: number) => (
    <PaginationItem key={page}>
      <PaginationLink
        href={{
          pathname: '/dashboard/products',
          query: createQueryString(page)
        }}
        isActive={page === currentPage}
      >
        {page}
      </PaginationLink>
    </PaginationItem>
  )

  const getPaginationItems = () => {
    const items = []

    if (pages <= maxVisiblePages) {
      for (let i = 1; i <= pages; i++) {
        items.push(RenderPageLink(i))
      }
    } else {
      // Always show first page
      items.push(RenderPageLink(1))

      // Show ellipsis if current page is more than 3
      if (currentPage > 3) {
        items.push(<PaginationEllipsis key="ellipsis-1" />)
      }

      // Show current page and one before and after
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(pages - 1, currentPage + 1); i++) {
        items.push(RenderPageLink(i))
      }

      // Show ellipsis if current page is less tahn (total pages - 2)
      if (currentPage < pages - 2) {
        items.push(<PaginationEllipsis key="ellipsis-2" />)
      }

      // Always show last page
      items.push(RenderPageLink(pages))
    }

    return items
  }

  return (
    <div className="flex items-center justify-end space-x-2 px-2 py-2 bg-white">
      <Pagination className="flex justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={{
                pathname: '/dashboard/products',
                query: { ...query, current: currentPage !== 1 ? currentPage - 1 : currentPage }
              }}
            />
          </PaginationItem>
          {getPaginationItems()}
          <PaginationItem>
            <PaginationNext
              href={{
                pathname: '/dashboard/products',
                query: { ...query, current: currentPage !== pages ? currentPage + 1 : currentPage }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
