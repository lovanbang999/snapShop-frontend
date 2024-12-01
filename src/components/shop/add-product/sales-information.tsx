import { CircleHelpIcon } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { ChangeEvent, useState } from 'react'
import Variants from './variants'
import InputPrice from '../../input-price'
import _ from 'lodash'
import InputQuantity from '../../input-quantity'
import { useAddProductContext } from '../AddProductProvider'
import { PriceAndStockType } from '@/types/add-product-provider'

export default function SalesInformation() {
  const { priceAndStock, setPriceAndStock } = useAddProductContext()
  const [isVariantTurnOn, setIsVariantTurnOn] = useState<boolean>(false)

  const handleChangePrice = (value: string) => {
    setPriceAndStock(prev => {
      const newPriceAndStock: PriceAndStockType = JSON.parse(JSON.stringify(prev))
      newPriceAndStock.price = Number(value)

      return newPriceAndStock
    })
  }

  const handleChangeQuantity = (value: string) => {
    setPriceAndStock(prev => {
      const newPriceAndStock: PriceAndStockType = JSON.parse(JSON.stringify(prev))
      newPriceAndStock.quantity = Number(value)

      return newPriceAndStock
    })
  }

  const handleChangeSku = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    setPriceAndStock(prev => {
      const newPriceAndStock = { ...prev }
      newPriceAndStock.sku = value
      return newPriceAndStock
    })
  }

  return (
    <div className="bg-white py-4 px-4 rounded-md space-y-8">
      <div className="flex items-center gap-2 mb-8">
        <span className="block w-6 h-6 text-center text-white bg-main rounded-full">3</span>
        <h3 className="text-main font-semibold">Sales Information</h3>
      </div>

      <div className="px-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <p className="text-textColor">You casn add variants if this product has multiple options such as size or color</p>
            <CircleHelpIcon className="h-5 w-5 text-textColor" />
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="airplane-mode">Enable variations</Label>
            <Switch
              id="airplane-mode"
              checked={isVariantTurnOn}
              onClick={() => setIsVariantTurnOn(!isVariantTurnOn)}
            />
          </div>
        </div>

        {!isVariantTurnOn ? (
          <div className="flex border p-2 rounded-sm gap-6">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="product-price">Price</Label>
                <span className="text-red-500">*</span>
              </div>
              <InputPrice
                id="product-price"
                value={priceAndStock.price}
                onChange={handleChangePrice}
                placeholder="Enter"
              />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="product-quantity">Quantity</Label>
                <span className="text-red-500">*</span>
              </div>
              <InputQuantity
                id="product-quantity"
                value={priceAndStock.quantity}
                onChange={handleChangeQuantity}
                placeholder="Enter"
              />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="product-sku">SKU</Label>
                <span className="text-red-500">*</span>
              </div>
              <Input
                id="product-sku"
                value={priceAndStock.sku}
                onChange={handleChangeSku}
                placeholder="Enter"
              />
            </div>
          </div>
        ) : (
          <Variants />
        )}
      </div>
    </div>
  )
}
