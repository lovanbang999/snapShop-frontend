import { Separator } from '@/components/ui/separator'

export default function TodoListForShop() {
  return (
    <div className="bg-white px-4 py-8 rounded-md">
      <h4 className="text-xl font-semibold">To-do list</h4>
      <p className="text-textColor text-sm">List of tasks you need to do.</p>

      <div className="flex flex-col gap-5 mt-4 mx-20">

        <div className="flex justify-between w-full">
          <div className="flex flex-1 flex-col items-center justify-center">
            <p className="text-textColor">Wait for confirm</p>
            <p className="text-main">0</p>
          </div>
          <Separator className="py-5" orientation="vertical" />
          <div className="flex flex-1 flex-col items-center justify-center">
            <p className="text-textColor">Wait for delivery</p>
            <p className="text-main">0</p>
          </div>
          <Separator className="py-5" orientation="vertical" />
          <div className="flex flex-1 flex-col items-center justify-center">
            <p className="text-textColor">Processed</p>
            <p className="text-main">0</p>
          </div>
          <Separator className="py-5" orientation="vertical" />
          <div className="flex flex-1 flex-col items-center justify-center">
            <p className="text-textColor">Cancelled order</p>
            <p className="text-main">0</p>
          </div>
        </div>

        <div className="flex justify-between w-full">
          <div className="flex flex-1 flex-col items-center justify-center">
            <p className="text-textColor">Return items / Refund</p>
            <p className="text-main">0</p>
          </div>
          <Separator className="py-5" orientation="vertical" />
          <div className="flex flex-1 flex-col items-center justify-center">
            <p className="text-textColor">Product is locked</p>
            <p className="text-main">0</p>
          </div>
          <Separator className="py-5" orientation="vertical" />
          <div className="flex flex-1 flex-col items-center justify-center">
            <p className="text-textColor">Out of stock</p>
            <p className="text-main">0</p>
          </div>
          <Separator className="py-5" orientation="vertical" />
          <div className="flex flex-1 flex-col items-center justify-center">
            <p className="text-textColor">Promotion</p>
            <p className="text-main">0</p>
          </div>
        </div>

      </div>
    </div>
  )
}
