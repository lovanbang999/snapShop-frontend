'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import clsx from 'clsx'
import { SlidersHorizontalIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

const TabItem = ({ content, tabType, currentTabType }: { content: string, tabType: string, currentTabType: string | null }) => {
  const isActive = tabType === currentTabType

  return (
    <li className="me-2">
      <Link
        href={{
          pathname: '/dashboard/products',
          query: { type: tabType }
        }}
        className={clsx(
          'inline-block p-4 border-b-2 rounded-t-lg',
          {
            'text-main border-main': isActive,
            'border-transparent text-gray-500 dark:text-gray-400': !isActive,
            'hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-600 dark:hover:text-gray-300': !isActive
          }
        )}
        aria-current={isActive ? 'page' : undefined}
      >
        {content}
      </Link>
    </li>
  )
}

export default function TabNavigationForShop() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tab = searchParams.get('type')

  const handleSort = useCallback((param: string) => {
    return (value: string) => {
      const currentParams = new URLSearchParams(Array.from(searchParams.entries()))
      currentParams.set(param, value)

      const newSearchParams = currentParams.toString()
      const query = newSearchParams ? `?${newSearchParams}` : ''

      router.push(`${pathname}${query}`)
    }
  }, [searchParams, pathname, router])

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <div className="h-14 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400">
          <ul className="flex flex-wrap -mb-px justify-between">
            <div className="flex flex-wrap">
              <TabItem content="All product" tabType="all" currentTabType={tab} />
              <TabItem content="Active" tabType="active" currentTabType={tab} />
              <TabItem content="Not yet active" tabType="not-yet-active" currentTabType={tab} />
              <TabItem content="Violation" tabType="violation" currentTabType={tab} />
            </div>
            <AccordionTrigger lastIcon={false}>
              <SlidersHorizontalIcon />
            </AccordionTrigger>
          </ul>
        </div>
        <AccordionContent className="flex items-center p-3 gap-3">
          {/* Filer by Date */}
          <Select onValueChange={handleSort('date')}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Date</SelectLabel>
                <SelectItem value="inc">Increases Date</SelectItem>
                <SelectItem value="desc">Descreases Date</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* End fileter by Date */}

          {/* Filter by Price */}
          <Select onValueChange={handleSort('price')}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Price</SelectLabel>
                <SelectItem value="inc">Price increases</SelectItem>
                <SelectItem value="desc">Price descreases</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* End filter by price */}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
