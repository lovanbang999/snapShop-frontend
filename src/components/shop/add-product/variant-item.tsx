'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CircleHelpIcon, Trash2Icon } from 'lucide-react'
import clsx from 'clsx'
import { Variation } from './variants'
import { useState } from 'react'

export default function VariantItem({
  index,
  data,
  numberVariation,
  handleDeleteVariation,
  handleChangeVariationName,
  handleChangeValueOptionValue,
  handleAddOption,
  handleDeleteOption
}: {
  index: number,
  data: Variation,
  numberVariation: number,
  handleDeleteVariation: (index: number) => void,
  handleChangeVariationName: (index: number, value: string) => void,
  handleChangeValueOptionValue: (indexVariation: number, indexOption: number, value: string) => void,
  handleAddOption: (indexVariation: number, value: string) => void,
  handleDeleteOption: (indexVariation: number, indexOption: number) => void
}) {
  const [showVariationWarning, setShowVariationWarning] = useState(false)
  const [showOptionWarning, setShowOptionWarning] = useState(false)
  const [isDone, setIsDone] = useState(false)

  const handleClickDone = () => {
    const isNameFieldValid = data.name.trim().length >= 1
    const isOptionsValid = data.options?.[0].trim().length >= 1

    if (!isNameFieldValid) {
      setShowVariationWarning(true)
    }

    if (!isOptionsValid) {
      setShowOptionWarning(true)
    }

    if (isNameFieldValid && isOptionsValid) {
      setIsDone(true)
    }
  }

  const handleOnChangeVariation = (indexVariation: number, value: string) => {
    handleChangeVariationName(indexVariation, value)
    if (showVariationWarning) {
      setShowVariationWarning(false)
    }
  }

  const handleOnChangeOption = (indexVariation: number, indexOption: number, value: string) => {
    handleChangeValueOptionValue(index, indexOption, value)
    if (showOptionWarning) {
      setShowOptionWarning(false)
    }
  }

  return (
    <>
      {!isDone ? (
        <div className="space-y-2">
          <div className="bg-[#f5f5f5] p-5 pr-12 rounded-md space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-red-500">*</span>
                <p className="text-textColor">Variation name</p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <CircleHelpIcon className="h-4 w-4 text-textColor" />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <ul className="list-disc px-4">
                        <li>You can add up to 2 variations (such as color, size, etc.).</li>
                        <li>
                          <div>Set the most important variation as the first one and add</div>
                          <div>corresponding product image for different variations instead of</div>
                          <div>using the same image for all of them.</div>
                        </li>
                      </ul>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center gap-3">
                <div className="group flex flex-1 items-center">
                  <div className={clsx('flex flex-1 group-hover:border-main group-hover:bg-white group-focus-within:border-main group-focus-within:bg-white max-w-[1100px] items-center border rounded-sm pr-2 gap-2', {
                    'bg-white': data.name.length > 1,
                    'border-red-500': showVariationWarning
                  })}>
                    <Input
                      placeholder="Enter a variation"
                      className="flex-1 focus-visible:ring-0 border-none shadow-none"
                      value={data.name}
                      maxLength={50}
                      onChange={(event) => handleOnChangeVariation(index, event.target.value)}
                    />
                    <span className="text-textColor text-sm">{data.name.length || 0}/50</span>
                  </div>
                </div>
                {numberVariation > 1 && <Trash2Icon className="w-4 h-4 cursor-pointer text-textColor" onClick={(event) => handleDeleteVariation(index)} />}
              </div>
              {showVariationWarning && (
                <p className="text-red-500 text-sm mt-4">Please enter a variation</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-red-500">*</span>
                <p className="text-textColor">Option</p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <CircleHelpIcon className="h-4 w-4 text-textColor" />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <ul className="list-disc px-4">
                        <li>
                          <div>Capitalize the first letter of each word (except conjunctions,</div>
                          <div>articles, prepositions).</div>
                        </li>
                        <li>
                          <div>Set the most important variation as the first one and add</div>
                          <div>corresponding product image for different variations instead of</div>
                          <div>using the same image for all of them.</div>
                        </li>
                      </ul>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              {data.options.map((option, indexOfOption) => (
                <div key={indexOfOption} className="flex items-center gap-3">
                  <div className="group flex flex-1 items-center">
                    <div className={clsx('flex flex-1 group-hover:border-main group-hover:bg-white group-focus-within:border-main group-focus-within:bg-white max-w-[1100px] items-center border rounded-sm pr-2 gap-2', {
                      'bg-white': option.length > 0,
                      'border-red-500': showOptionWarning
                    })}>
                      <Input
                        placeholder="Enter an option"
                        className="flex-1 focus-visible:ring-0 border-none shadow-none"
                        value={option || ''}
                        maxLength={50}
                        onChange={(event) => handleOnChangeOption(index, indexOfOption, event.target.value)}
                        onBlur={(event) => handleAddOption(index, event.target.value)}
                      />
                      <span className="text-textColor text-sm">{option.length || 0}/50</span>
                    </div>
                  </div>
                  {option.length > 0 && <Trash2Icon className="w-4 h-4 cursor-pointer text-textColor" onClick={() => handleDeleteOption(index, indexOfOption)} />}
                </div>
              ))}
              {showOptionWarning && (
                <p className="text-red-500 text-sm mt-4">Please enter an option</p>
              )}
            </div>

            <Button className="bg-main" onClick={handleClickDone}>Done</Button>
          </div>
        </div>
      ) : (
        <div className="bg-[#f5f5f5] p-5 pr-12 rounded-md space-y-4 flex ">
          <div className="flex-1 space-y-2">
            <p>{data.name}</p>
            <div className="flex gap-2">
              {data.options.map((item, index) =>
                item !== '' && (
                  <div key={index} className="block text-center min-w-10 max-w-40 py-1 px-2 bg-[#0000001a] truncate rounded-full">
                    {item}
                  </div>
                ))}
            </div>
          </div>
          <Button variant="ghost" onClick={() => setIsDone(false)}>Edit</Button>
        </div>
      )}
    </>
  )
}
