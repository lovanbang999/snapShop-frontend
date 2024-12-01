'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import VariantItem from './variant-item'
import VariantList from './variant-list'

export interface Variation {
  name: string;
  options: string[];
}

export default function Variants() {
  const MAX_COUNT_VARIATION = 2
  const [variation, setVariation] = useState<Variation[]>([{ name: '', options: [''] }])

  const handleAddVariation = () => {
    setVariation(prev => ([...prev, { name: '', options: [''] }]))
  }

  const handleDeleteVariation = (index: number) => {
    setVariation(prev => {
      const newVariation = [...prev]
      newVariation.splice(index, 1)

      return newVariation
    })
  }

  const handleChangeVariationName = (index: number, value: string) => {
    setVariation(prev => {
      const newVariation = [...prev]
      newVariation[index].name = value

      return newVariation
    })
  }

  const handleChangeValueOptionValue = (indexVariation: number, indexOption: number, value: string) => {
    setVariation(prev => {
      const newVariation = [...prev]
      newVariation[indexVariation].options[indexOption] = value

      return newVariation
    })
  }

  const handleAddOption = (indexVariation: number, value: string) => {
    if (value.length > 0) {
      setVariation(prev => {
        const newVariation = [...prev]
        const currentOptions = newVariation[indexVariation].options

        // Only push an empty string if it's not already present
        if (currentOptions[currentOptions.length - 1].trim() !== '') {
          currentOptions.push('')
        }

        return newVariation
      })
    }
  }

  const handleDeleteOption = (indexVariation: number, indexOption: number) => {
    setVariation(prev => {
      const newVariation: Variation[] = JSON.parse(JSON.stringify(prev))
      newVariation[indexVariation].options.splice(indexOption, 1)

      return newVariation
    })
  }

  return (
    <div className="space-y-4">
      {variation.map((variantItem, index) => (
        <VariantItem
          key={index}
          index={index}
          data={variantItem}
          numberVariation={variation.length}
          handleDeleteVariation={handleDeleteVariation}
          handleChangeVariationName={handleChangeVariationName}
          handleChangeValueOptionValue={handleChangeValueOptionValue}
          handleAddOption={handleAddOption}
          handleDeleteOption={handleDeleteOption}
        />
      ))}

      {variation.length < MAX_COUNT_VARIATION && (
        <Button variant="ghost" className="text-main gap-2" onClick={handleAddVariation}>
          <PlusIcon />
          Add Variation
        </Button>
      )}

      <div className="flex items-center space-x-1">
        <span className="text-red-500">*</span>
        <p>Variation list</p>
      </div>
      <VariantList data={variation} />
    </div>
  )
}
