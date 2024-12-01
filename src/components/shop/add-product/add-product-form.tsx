'use client'

import { Button } from '@/components/ui/button'
import ProductDetail from './product-detail'
import ProductInformation from './product-information'
import SalesInformation from './sales-information'
import Shipping from './shipping'
import { useAddProductContext } from '../AddProductProvider'

export default function AddProductForm() {
  const { handleSave } = useAddProductContext()

  return (
    <div className="w-full h-full space-y-6 overflow-y-auto scrollbar-hide py-10">
      <div className="mb-6">
        <h2 className="text-2xl text-textColor font-semibold">Add product</h2>
        <p className="text-textColor">Add your store&apos;s letest prodducts here</p>
      </div>

      <ProductInformation />
      <ProductDetail />
      <SalesInformation />
      <Shipping />
    </div>
  )
}
