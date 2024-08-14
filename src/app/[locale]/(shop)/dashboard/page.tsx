import { MaketingChannel } from '@/components/shop/dashboard/maketing-channel'
import { PerformanceEfficiency } from '@/components/shop/dashboard/performance-efficiency'
import { SaleAnalysisForShop } from '@/components/shop/dashboard/shop-sale-analysis'
import { TodoListForShop } from '@/components/shop/dashboard/shop-toto-list'

export default function Page() {
  return (
    <div className="bg-[#F5F5F5] w-full h-full flex gap-4 p-4 overflow-hidden">

      {/* Action main */}
      <div className="flex-1 h-full mx-8 pr-1 overflow-auto scrollbar-custom">
        <TodoListForShop />
        <SaleAnalysisForShop />
        <MaketingChannel />
        <PerformanceEfficiency />
      </div>
      {/* End action main */}

      {/* Recent order */}
      <div className="w-[15%] bg-white p-4 h-full rounded-md">right</div>
      {/* End recent order */}
    </div>
  )
}
