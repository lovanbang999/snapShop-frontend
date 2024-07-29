'use client'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { XIcon } from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import { ActualClassificationType, ClassificationType } from '@/schemaValidations/product.schema'
import { handleShowErrorToast } from '@/lib/utils'
import { useAddProductContext } from '@/components/shop/AddProductProvider'
import Option from './option'

const generateCombinatioins = (classsifications: ClassificationType[]) => {
  if (classsifications.length === 1) {
    return classsifications[0].options
  }

  const [first, ...rest] = classsifications
  const restCombinations: string[] = generateCombinatioins(rest)

  return first.options.flatMap(option =>
    restCombinations.length > 0
      ? restCombinations.map(combo => `${option}, ${combo}`)
      : [option]
  )
}

export default function QicklyAddSku() {
  const { classification, setClassification, setActualClassification } = useAddProductContext()
  const [alertDialogOpen, setAlertDialogOpen] = useState(false)

  const handleAddCategory = () => {
    if (classification.length >= 3) return

    setClassification(prev => [...prev, { nameClassification: undefined, options: [''] }])
  }

  const handleChangeClassificationName = (event: ChangeEvent<HTMLInputElement>, indexClass: number) => {
    const { name, value } = event.target

    setClassification(prev => {
      const newState = [...prev]
      newState[indexClass] = {
        ...newState[indexClass],
        [name]: value
      }

      return newState
    })
  }

  const hanleSaveClassification = () => {
    if (classification.length < 2) {
      handleShowErrorToast({
        message: 'You can only save when there are 2 or more classification'
      })

      return
    }

    classification.forEach(classItem => {
      if (classItem.nameClassification === undefined || classItem.nameClassification === '') {
        handleShowErrorToast({
          message: 'Name of classificaiton has not empty!'
        })

        return
      }
    })

    const combination = generateCombinatioins(classification)
    const newActualClassification: ActualClassificationType[] = combination.map(item => ({
      sku: item,
      status: true
    }))

    setActualClassification(newActualClassification)
    setAlertDialogOpen(false)
  }

  return (
    <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
      <AlertDialogTrigger>Qickly add SKU</AlertDialogTrigger>

      <AlertDialogContent className="p-0 pb-4">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="flex items-center justify-between h-20 border-b-2 shadow-sm px-4">
              Add Quickly SKU
              <AlertDialogCancel className="border-none bg-transparent shadow-none">
                <XIcon />
              </AlertDialogCancel>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>

          <div className="h-[600px] overflow-y-auto scrollbar-custom space-y-4">
            {!!classification.length && classification.map((item: ClassificationType, index: number) => (
              <div key={index} className="p-6 bg-[#F4F7FA] mx-4 rounded-sm overflow-y-auto">
                <p className="text-lg text-[#71717A] font-semibold mb-2">Classification {index + 1}</p>
                <div className="flex flex-col px-4">
                  <label htmlFor="" className="text-textColor mb-1">Name classification</label>
                  <input
                    type="text"
                    placeholder="Enter"
                    name="nameClassification"
                    value={item.nameClassification || ''}
                    onChange={(event) => handleChangeClassificationName(event, index)}
                    className="bg-transparent border-2 rounded-sm p-2"
                  />

                  <Option classificationOptions={item.options} indexClass={index} setClassification={setClassification} />
                </div>
              </div>
            ))}

            <Button variant="secondary" className="w-fit ml-4 hover:text-main" onClick={handleAddCategory} disabled={classification.length >= 3} style={{ marginTop: '16px' }}>
              Add category
            </Button>
          </div>

        </AlertDialogHeader>
        <AlertDialogFooter className="mr-4 items-center">
          <p className="flex-1 ml-4">{classification.length}/3 classifications have been added</p>
          <AlertDialogCancel className="text-lg">Cancel</AlertDialogCancel>
          <Button onClick={hanleSaveClassification} className="bg-main px-10 text-lg hover:bg-main">Save</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
