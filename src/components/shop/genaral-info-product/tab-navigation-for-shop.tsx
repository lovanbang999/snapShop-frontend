'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import clsx from 'clsx'
import { ChevronDownIcon, FilterIcon, SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useGeneralContext } from '../GeneralProductProvider'
import _ from 'lodash'

const TabItem = ({
  content,
  tabType,
  currentTabType
}: {
  content: string,
  tabType: string,
  currentTabType: string | null
}) => {
  const isActive = tabType === currentTabType
  const searchParams = useSearchParams()
  const query = Object.fromEntries(searchParams.entries())

  return (
    <li className="me-2">
      <Link
        href={{
          pathname: '/dashboard/products',
          query: { ...query, current: 1, pageSize: 5, type: tabType }
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
  const { rowSelected, setRowSelected } = useGeneralContext()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tab = searchParams.get('type')
  const [priceValue, setPriceValue] = useState<string>('')
  const [dateValue, setDateValue] = useState<string>('')

  useEffect(() => {
    // Check if 'type' query parameter is missing
    if (!searchParams.get('type')) {
      // Update the URL with the default 'type=all'
      router.replace('?type=all&current=1&pageSize=5', { scroll: false })
    }

    setRowSelected({})
  }, [router, searchParams, setRowSelected])

  const handleSort = useCallback((param: string) => {
    return (value: string) => {
      const currentParams = new URLSearchParams(Array.from(searchParams.entries()))
      if (param === 'date') {
        setDateValue(value)
        setPriceValue('')

        if (currentParams.has('price'))
          currentParams.delete('price')
      }

      if (param === 'price') {
        setPriceValue(value)
        setDateValue('')

        if (currentParams.has('date'))
          currentParams.delete('date')
      }

      currentParams.set(param, value)

      const newSearchParams = currentParams.toString()
      const query = newSearchParams ? `?${newSearchParams}` : ''

      router.push(`${pathname}${query}`)
    }
  }, [searchParams, pathname, router])

  const handleResetFilter = () => {
    const currentParams = new URLSearchParams(Array.from(searchParams.entries()))

    if (currentParams.has('price')) currentParams.delete('price')
    if (currentParams.has('date')) currentParams.delete('date')
    setDateValue('')
    setPriceValue('')

    const newSearchParams = currentParams.toString()
    const query = newSearchParams ? `?${newSearchParams}` : ''

    router.push(`${pathname}${query}`)
  }

  return (
    <div className="flex flex-col text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 mb-4">
      {/* Tablist */}
      <ul className="flex flex-wrap -mb-px justify-between">
        <div className="flex flex-wrap">
          <TabItem content="All product" tabType="all" currentTabType={tab} />
          <TabItem content="Active" tabType="active" currentTabType={tab} />
          <TabItem content="Deactive" tabType="deactive" currentTabType={tab} />
        </div>
      </ul>
      {/* End Tablist */}

      {/* Filter list */}
      <div className="flex flex-col w-full h-full bg-white py-4 px-8 mt-4 rounded-md gap-4">
        <div className="flex w-full items-center gap-5">
          <div className="flex-1 flex h-fit w-80 border-2 rounded-md">
            <Input placeholder="Search product here..." className="border-none shadow-none focus-visible:ring-0 rounded-md" />
            <Button variant="ghost" className="rounded-md">
              <SearchIcon />
            </Button>
          </div>

          <Select value={priceValue} onValueChange={handleSort('price')}>
            <SelectTrigger className="w-[350px]" icon={<ChevronDownIcon />}>
              <SelectValue placeholder="Sort by Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filter by Price</SelectLabel>
                <SelectItem value="inc">Price Increase</SelectItem>
                <SelectItem value="desc">Price Decrease</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select value={dateValue} onValueChange={handleSort('date')}>
            <SelectTrigger className="w-[350px]" icon={<ChevronDownIcon />}>
              <SelectValue placeholder="Sort by Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filter by Date</SelectLabel>
                <SelectItem value="inc">Date Increase</SelectItem>
                <SelectItem value="desc">Date Decrease</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[350px]" startIcon={<FilterIcon className="h-5 w-5 opacity-80" />} icon={<ChevronDownIcon />}>
              <SelectValue placeholder="See more filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>See more filter</SelectLabel>
                <SelectItem value="inc">More</SelectItem>
                <SelectItem value="desc">Decrease</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            className="border-main text-main hover:text-main"
            onClick={() => handleResetFilter()}
          >
            Reset
          </Button>
        </div>

        <div className="flex-1 flex w-full items-center space-x-16">
          <p>Selected: <span className="text-main">{_.size(rowSelected)}</span></p>
          <div className="space-x-6">
            <Button variant="outline" className="border-main text-main hover:text-main" disabled>Active</Button>
            <Button variant="outline" className="border-main text-main hover:text-main" disabled>Deactivate</Button>
            <Button variant="outline" className="border-main text-main hover:text-main" disabled>Deleted</Button>
          </div>
        </div>
      </div>
      {/* End filter list */}

    </div>
  )
}
