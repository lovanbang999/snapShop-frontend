'use client'

import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Trash2Icon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import InputPrice from '../../input-price'
import InputQuantity from '../../input-quantity'
import { Variation } from './variants'

interface VariationCombination {
  name: string;
  price: number;
  quantity: number;
  sku: string;
}

const generateCombinations = (variations: Variation[]) => {
  const combine = (current: string[], index: number): VariationCombination[] => {
    if (index === variations.length) {
      return [{
        name: current.filter(Boolean).join('-'),
        price: 0,
        quantity: 0,
        sku: ''
      }]
    }

    let results: VariationCombination[] = []
    for (let option of variations[index].options) {
      if (option !== '') {
        results = results.concat(combine([...current, option], index + 1))
      }
    }

    return results
  }

  return combine([], 0).filter(combo => combo.name !== '')
}

export default function VariantList({
  data
}: {
  data: Variation[]
}) {
  const [variant, setVariant] = useState<VariationCombination[]>(generateCombinations(data))

  useEffect(() => {
    setVariant(generateCombinations(data))
  }, [data])

  const handleChangePrice = (index: number, newPrice: string) => {
    setVariant(prevVariant => {
      const newVariation: VariationCombination[] = JSON.parse(JSON.stringify(prevVariant))
      newVariation[index].price = Number(newPrice)

      return newVariation
    })
  }

  const handleChangeQuantity = (index: number, newQuantity: string) => {
    setVariant(prevVariant => {
      const newVariation: VariationCombination[] = JSON.parse(JSON.stringify(prevVariant))
      newVariation[index].quantity = Number(newQuantity)

      return newVariation
    })
  }

  const handleChangeSku = (index: number, newSku: string) => {
    setVariant(prevVariant => {
      const newVariation: VariationCombination[] = JSON.parse(JSON.stringify(prevVariant))
      newVariation[index].sku = newSku

      return newVariation
    })
  }

  const handleDeleteVariant = (index: number) => {
    setVariant(prevVariant => {
      const newVariation: VariationCombination[] = JSON.parse(JSON.stringify(prevVariant))
      newVariation.splice(index, 1)

      return newVariation
    })
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader className="bg-[#f7f7f7] rounded-md">
          <TableRow>
            {data?.[0]?.name === '' ? (
              <TableHead>Variation name</TableHead>
            ) : (
              data?.map((item, index) => <TableHead key={index}>{item.name}</TableHead>)
            )}
            <TableHead className="">
              <div className="flex items-center gap-2">
                <span className="text-red-500">*</span>
                <p>Retail price</p>
              </div>
            </TableHead>
            <TableHead className="">
              <div className="flex items-center gap-2">
                <span className="text-red-500">*</span>
                <p>Quantity</p>
              </div>
            </TableHead>
            <TableHead className="">Seller SKU</TableHead>
            <TableHead className='w-6'></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.[0]?.name === '' ? (
            <TableRow>
              <TableCell colSpan={6} className="h-20 w-full content-center text-center">
                No available SKUs
              </TableCell>
            </TableRow>
          ) : (
            variant.map((item, index) => (
              <TableRow key={index}>
                {item.name?.split('-').map((i, idx) =>
                  <TableCell key={idx} className="font-medium">{i}</TableCell>
                )}
                <TableCell>
                  <InputPrice value={item.price} onChange={(newPrice: string) => handleChangePrice(index, newPrice)} />
                </TableCell>
                <TableCell>
                  <InputQuantity value={item.quantity} onChange={(newQuantity: string) => handleChangeQuantity(index, newQuantity)} />
                </TableCell>
                <TableCell>
                  <Input value={item.sku} onChange={(event) => handleChangeSku(index, event.target.value)} />
                </TableCell>
                <TableCell>
                  <Trash2Icon className="w-4 h-4 cursor-pointer" onClick={() => handleDeleteVariant(index)} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
