'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { ChevronDownIcon, SquarePlusIcon } from 'lucide-react'
import Link from 'next/link'
import TabNavigationForShop from '@/components/shop/genaral-info-product/tab-navigation-for-shop'
import ListProductForSale from '@/components/shop/genaral-info-product/list-product-for-sale'
import { Button } from '@/components/ui/button'
import GeneralProductProvider, { useGeneralContext } from '@/components/shop/GeneralProductProvider'

export default function Page() {
  return (
    <GeneralProductProvider>
      <section className="flex flex-col w-full h-full px-10 pt-10 overflow-auto">
        {/* Action */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg text-[#71717A]">Product for sale</p>
            <p className="text-sm text-textColor">List of products currently for sale at the shop</p>
          </div>

          <div className="flex items-center gap-5">
            <Select defaultValue="batch">
              <SelectTrigger className="w-[250px] bg-white" icon={<ChevronDownIcon />}>
                <SelectValue placeholder="Processing process" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="batch">Batch Processing</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button asChild className="bg-main h-full">
              <Link href="/dashboard/products/add" className="flex items-center gap-2">
                <SquarePlusIcon />
                Add product
              </Link>
            </Button>
          </div>
        </div>
        {/* End action */}

        {/* List */}
        <div className="flex flex-1 flex-col mt-10">
          <TabNavigationForShop />
          <ListProductForSale />
        </div>
        {/* End list */}
      </section>
    </GeneralProductProvider>
  )
}
