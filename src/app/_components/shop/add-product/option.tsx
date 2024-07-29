import { Button } from '@/components/ui/button'
import { ClassificationType } from '@/schemaValidations/product.schema'
import { PlusIcon } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

interface OptionType {
  classificationOptions: string[];
  indexClass: number;
  setClassification: Dispatch<SetStateAction<ClassificationType[]>>;
}

export default function Option({ classificationOptions, indexClass, setClassification }: OptionType) {
  const handleAddOption = (index: number) => {
    setClassification(prev => {
      const newState = [...prev]
      newState[index] = {
        ...newState[index],
        options: [...newState[index].options, '']
      }
      return newState
    })
  }

  const handleChangeInputOption = (indexClass: number, indexOption: number, value: string) => {
    setClassification(prev => {
      const newState = [...prev]
      const newOptions = [...newState[indexClass].options]
      newOptions[indexOption] = value

      newState[indexClass] = {
        ...newState[indexClass],
        options: newOptions
      }

      return newState
    })
  }

  return (
    <div className="mt-6 space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor="">Option</label>
        <Button variant="ghost" onClick={() => handleAddOption(indexClass)} className="flex items-center text-main gap-1">
          <PlusIcon className="w-4" />
          <p>Add option</p>
        </Button>
      </div>
      {!!classificationOptions.length && classificationOptions.map((option, index) =>
        <input
          key={index}
          type="text"
          placeholder="Enter"
          value={option || ''}
          onChange={(event) => handleChangeInputOption(indexClass, index, event.target.value)}
          className="bg-transparent border-2 rounded-sm p-2 w-full"
        />
      )}
    </div>
  )
}
