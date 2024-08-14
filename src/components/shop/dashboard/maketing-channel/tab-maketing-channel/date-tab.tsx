'use client'

import { Button } from '@/components/ui/button'
import { CalendarCustom } from '@/components/ui/calendar-custom'
import { ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const ListNotiItem = () => {
  return (
    <li className="flex gap-4 border-b-2 py-2">
      <div className="text-center">
        <p>Web</p>
        <p className="text-main font-semibold">06</p>
      </div>
      <div>
        <div className="flex items-start justify-between">
          <p className="font-semibold text-lg">Snapshop 9.9 Super Shopping Day</p>
          <Button variant="link" asChild>
            <Link href="#">
              See all
              <ChevronRightIcon />
            </Link>
          </Button>
        </div>
        <div>
          <p>💥 Up to 50% off! 💥</p>
          <p>🔖 Promotion period: From August 1, 2024, to August 15, 2024</p>
          <p>📅 Limited time offer! Don&apos;t miss the chance to shop and save big with our special discount program on Shopee!</p>
        </div>
      </div>
    </li>
  )
}


export default function DateTab() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="h-full flex gap-10">
      <CalendarCustom
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border w-2/5"
      />
      <ul className="flex flex-col h-[348px] overflow-auto gap-3 scrollbar-hide">
        <ListNotiItem />
        <ListNotiItem />
        <ListNotiItem />
        <ListNotiItem />
        <ListNotiItem />
      </ul>
    </div>
  )
}
