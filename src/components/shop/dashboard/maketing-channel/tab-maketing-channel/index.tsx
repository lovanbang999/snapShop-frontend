'use client'

import clsx from 'clsx'
import { useState } from 'react'
import DateTab from './date-tab'
import { BadgePercentIcon, GiftIcon, TagIcon, TicketCheckIcon, ZapIcon } from 'lucide-react'

export default function TabMaketingChannel() {
  const [activeTab, setActiveTab] = useState(0)

  const tabHeader = [
    'Date',
    'Flash sale',
    'Product Discount Program',
    'Discount Code Program'
  ]

  const tabContent = [
    <DateTab key='date-tab' />,
    'Tab content 2',
    'Tab content 3',
    'Tab content 4'
  ]

  return (
    <div className="mt-5 px-10">
      <div className="flex gap-20 border-b-2 border-gray-200">
        {tabHeader.map((tabItem, index) => (
          <div
            key={index}
            className={clsx('relative mb-2 font-medium px-10', {
              'text-main after:content-[""] after:block after:absolute after:w-[80%] after:h-[2px] after:bg-main after:top-8 after:left-1/2 after:transform after:-translate-x-1/2 after:rounded-md': activeTab === index
            })}
            onClick={() => setActiveTab(index)}
          >
            {tabItem}
          </div>
        ))}
      </div>

      <div className="mt-10">
        {tabContent[activeTab]}
      </div>

      <div className="mt-10">
        <p className="font-bold text-xl">Tool maketing</p>
        <ul className="mt-6 flex items-start justify-evenly">
          <li className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center w-20 h-20 bg-[#1A8B9F26] rounded-full">
              <TicketCheckIcon className="w-8 h-8 text-main" />
            </div>
            <p className="font-medium text-xl mt-4">Shop discount code</p>
            <p className="w-36 text-center text-textColor mt-3">Tool to increase orders by creating discount codes for buyers</p>
          </li>
          <li className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center w-20 h-20 bg-[#1A8B9F26] rounded-full">
              <TagIcon className="w-8 h-8 text-main" />
            </div>
            <p className="font-medium text-xl mt-4">Discount program</p>
            <p className="w-36 text-center text-textColor mt-3">Tool to increase orders by creating discount programs</p>
          </li>
          <li className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center w-20 h-20 bg-[#1A8B9F26] rounded-full">
              <ZapIcon className="w-8 h-8 text-main" />
            </div>
            <p className="font-medium text-xl mt-4">Flash sale of shop</p>
            <p className="w-36 text-center text-textColor mt-3">Tool to boost orders by creating big promotions within a specific time period</p>
          </li>
          <li className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center w-20 h-20 bg-[#1A8B9F26] rounded-full">
              <GiftIcon className="w-8 h-8 text-main" />
            </div>
            <p className="font-medium text-xl mt-4">Discount bundle</p>
            <p className="w-36 text-center text-textColor mt-3">Create promotional bundles to increase the value of orders</p>
          </li>
          <li className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center w-20 h-20 bg-[#1A8B9F26] rounded-full">
              <BadgePercentIcon className="w-8 h-8 text-main" />
            </div>
            <p className="font-medium text-xl mt-4">Offer</p>
            <p className="w-36 text-center text-textColor mt-3">Encourage customers to follow the shop by offering vouchers to new followers</p>
          </li>
        </ul>
      </div>
    </div>
  )
}
