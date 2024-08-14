import { Button } from '@/components/ui/button'
import { ChevronRightIcon } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import LineChartForAnalysis from './line-chart-for-analysis'

export default function SaleAnalysisForShop() {
  return (
    <div className="bg-white px-4 py-8 mt-6 rounded-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xl font-semibold">Sales analysis</h4>
          <p className="text-textColor text-sm">Your store datas will be displayed here.</p>
        </div>
        <div className="h-full flex gap-3">
          <Button variant="ghost" className="text-main bg-[#F1F5F9]">Today</Button>
          <Button variant="ghost" className="text-textColor hover:bg-[#F1F5F9] hover:text-main">7 Days</Button>
          <Button variant="ghost" className="text-textColor hover:bg-[#F1F5F9] hover:text-main">30 Days</Button>
          <Button variant="ghost" className="text-textColor hover:bg-[#F1F5F9] hover:text-main">6 Months</Button>
          <Button variant="ghost" className="text-textColor hover:bg-[#F1F5F9] hover:text-main">12 Months</Button>
        </div>
        <Button variant="link">
          See all
          <ChevronRightIcon />
        </Button>
      </div>
      {/* End header */}

      {/* Main */}
      <div className="h-fit flex mt-10">
        <LineChartForAnalysis />

        <div className="flex flex-col w-2/5 items-center justify-evenly gap-4">
          <div className="w-full flex justify-evenly">
            <div>
              <p className="font-semibold">Oder</p>
              <p className="text-xl font-semibold text-main">0</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-main"></div>
                <p>with yesterday</p>
              </div>
            </div>
            <Separator orientation='vertical' />
            <div>
              <p className="font-semibold">Sold</p>
              <p className="text-xl font-semibold text-main">0</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#9C1A1A99]"></div>
                <p>with yesterday</p>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-evenly">
            <div>
              <p className="font-semibold">Views</p>
              <p className="text-xl font-semibold text-main">0</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#4C257B]"></div>
                <p>with yesterday</p>
              </div>
            </div>
            <Separator orientation='vertical' />
            <div>
              <p className="font-semibold">Conversion rate</p>
              <p className="text-xl font-semibold text-main">0</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#9EDDA08C]"></div>
                <p>with yesterday</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End main */}
    </div>
  )
}
