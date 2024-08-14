import { Button } from '@/components/ui/button'
import { ArrowDownIcon, ArrowUpIcon, ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'

export default function PerformanceEfficiency() {
  return (
    <div className="bg-white px-4 py-8 mt-6 rounded-md">
      <div className="flex items-start justify-between">
        <h4 className="text-xl font-semibold">Performance efficiency</h4>
        <Button variant="link" asChild>
          <Link href="#">
            See all
            <ChevronRightIcon />
          </Link>
        </Button>
      </div>
      <p className="text-textColor text-sm">The performance efficiency chart will help the seller better understand the shop&apos;s business activities</p>

      <div className="mt-10 px-6">
        <div className="border-b-2 pb-2">
          <div className="relative w-fit px-6 after:content-[''] after:absolute after:w-full after:h-[3px] after:bg-main after:-bottom-[11px] after:left-0 after:rounded-md">Order management</div>
        </div>

        <div className="bg-[#F4F7FA] mt-10 p-4 rounded-md">
          <div className="flex justify-between bg-white px-4 py-2 rounded-md">
            <div className="flex-1 items-center text-textColor font-semibold">Criteria</div>
            <div className="flex-1 items-center text-textColor font-semibold">My shop</div>
            <div className="flex-1 items-center text-textColor font-semibold">Target</div>
          </div>
          <ul className="space-y-2 mt-2">
            <li className="flex justify-between px-4 py-2 rounded-md">
              <div className="flex-1 items-center text-textColor font-semibold">Successful order rate</div>
              <div className="flex-1 items-center text-textColor font-semibold">60%</div>
              <div className="flex-1 flex items-center text-textColor font-semibold gap-2">
                <ArrowUpIcon className="text-[#50974F]" />
                10%
              </div>
            </li>
            <li className="flex justify-between px-4 py-2 rounded-md">
              <div className="flex-1 items-center text-textColor font-semibold">Order cancellation rate</div>
              <div className="flex-1 items-center text-textColor font-semibold">45%</div>
              <div className="flex-1 flex items-center text-textColor font-semibold gap-2">
                <ArrowDownIcon className="text-[#FF3D00]" />
                4%
              </div>
            </li>
            <li className="flex justify-between px-4 py-2 rounded-md">
              <div className="flex-1 items-center text-textColor font-semibold">Return/refund rate</div>
              <div className="flex-1 items-center text-textColor font-semibold">30%</div>
              <div className="flex-1 flex items-center text-textColor font-semibold gap-2">
                <ArrowDownIcon className="text-[#FF3D00]" />
                5%
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
