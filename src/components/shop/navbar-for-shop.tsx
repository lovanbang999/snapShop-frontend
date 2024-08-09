'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import clsx from 'clsx'
import { BadgeHelpIcon, BarChart3Icon, HomeIcon, NotebookPenIcon, ShoppingBag, StoreIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function CustomAccordionContent({
  children,
  href
}: {
  children: React.ReactNode,
  href: string
}) {
  const path = usePathname()
  const pathname = `/${path.split('/').toSpliced(0, 2).join('/')}`
  const isActive = pathname === href

  return (
    <Link href={href} className={clsx('hover:text-main', {
      'text-main': isActive
    })}>
      <AccordionContent className="pl-3">
        {children}
      </AccordionContent>
    </Link>
  )
}

export default function NavbarForShop() {
  return (
    <nav className="h-full max-h-full w-60 min-w-60 px-6 py-8">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-0" className="border-b-0">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-4">
              <HomeIcon />
              Home
            </div>
          </AccordionTrigger>
          <CustomAccordionContent href="/dashboard">Dashboard</CustomAccordionContent>
        </AccordionItem>
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-4">
              <NotebookPenIcon />
              Order
            </div>
          </AccordionTrigger>
          <CustomAccordionContent href="/dashboard/order">All</CustomAccordionContent>
          <CustomAccordionContent href="/dashboard/order/delivery">Delivery</CustomAccordionContent>
          <CustomAccordionContent href="/dashboard/order/cacelation">Cancelation</CustomAccordionContent>
          <CustomAccordionContent href="/dashboard/order/refunds">Return / Refunds</CustomAccordionContent>
          <CustomAccordionContent href="/dashboard/order/setup">Shipping setups</CustomAccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="border-b-0">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-4">
              <ShoppingBag />
              Product
            </div>
          </AccordionTrigger>
          <CustomAccordionContent href="/dashboard/products">Products for sale</CustomAccordionContent>
          <CustomAccordionContent href="/dashboard/products/add">Add products</CustomAccordionContent>
          <CustomAccordionContent href="/dashboard/products/violating">Violating products</CustomAccordionContent>
          <CustomAccordionContent href="/dashboard/products/setups">Products setups</CustomAccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="border-b-0">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-4">
              <BarChart3Icon />
              Financial
            </div>
          </AccordionTrigger>
          <CustomAccordionContent href="/dashboard/financial/revenue">Revenue</CustomAccordionContent>
          <CustomAccordionContent href="/dashboard/financial/snap-account">SnapShop account balance</CustomAccordionContent>
          <CustomAccordionContent href="/dashboard/financial/bank-account">Bank account</CustomAccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4" className="border-b-0">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-4">
              <StoreIcon />
              Shop
            </div>
          </AccordionTrigger>
          <CustomAccordionContent href="/dashboard/shop/profile">Shop profile</CustomAccordionContent>
          <CustomAccordionContent href="/dashboard/shop/decoration">Shop decoration</CustomAccordionContent>
          <CustomAccordionContent href="/dashboard/shop/setup">Shop setup</CustomAccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5" className="border-b-0">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-4">
              <BadgeHelpIcon />
              Support
            </div>
          </AccordionTrigger>
          <CustomAccordionContent href="/dashboard/support/portal">Seller support portal</CustomAccordionContent>
        </AccordionItem>
      </Accordion>
    </nav>
  )
}
