'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { CheckIcon, ChevronDown, CircleHelpIcon, InfoIcon, XIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ChangeEvent, useState } from 'react'
import InputSize from '@/components/input-size'
import clsx from 'clsx'
import { useAddProductContext } from '../AddProductProvider'

export default function Shipping() {
  const {
    weight,
    setWeight,
    productDimensions,
    setProductDimensions,
    delivery,
    setDelivery,
    deliveryOption,
    setDeliveryOption
  } = useAddProductContext()
  const [weightValue, setWeightValue] = useState('')
  const [showInfo, setShowInfo] = useState(true)

  const handleChangeTypeWieght = (value: string) => {
    setWeight(prevWeight => {
      const newWeight = { ...prevWeight }
      newWeight.type = value
      newWeight.value = 0

      return newWeight
    })
  }

  const handleChangeWeightValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    // Allow only numbers and ensure only one period is present
    const formattedValue = value.replace(/[^0-9.]/g, '') // Remove non-numeric and non-period characters
      .replace(/^([^.]*\.[^.]*)\./g, '$1') // Allow only one period

    setWeightValue(formattedValue)
  }

  const handleBlurInput = () => {
    if (weight.type === 'grams') {
      let numberValue = parseInt(weightValue)
      if (numberValue > 100000) numberValue = 100000
      if (!numberValue) {
        setWeightValue('')
        numberValue = 0
      } else {
        setWeightValue(numberValue.toString())
      }

      setWeight(prevWeight => {
        const newWeight = { ...prevWeight }
        newWeight.value = numberValue

        return newWeight
      })
    } else if (weight.type === 'kilograms') {
      let numberValue = Math.fround(parseFloat(weightValue))
      if (numberValue > 100) numberValue = 100

      setWeight(prevWeight => {
        const newWeight = { ...prevWeight }
        newWeight.value = numberValue

        return newWeight
      })
      setWeightValue(numberValue.toString())
    }
  }

  const handleChangeProductDimensions = (value: string, type: string) => {
    let floatValue = parseFloat(value)
    if (!floatValue) floatValue = 0
    if (floatValue > 1000) floatValue = 1000

    switch (type) {
      case 'height':
        setProductDimensions(prev => ({ ...prev, height: floatValue }))
        break
      case 'width':
        setProductDimensions(prev => ({ ...prev, width: floatValue }))
        break
      case 'length':
        setProductDimensions(prev => ({ ...prev, length: floatValue }))
        break
    }
  }

  return (
    <div className="bg-white py-4 px-4 rounded-md space-y-8">
      <div className="flex items-center gap-2 mb-8">
        <span className="block w-6 h-6 text-center text-white bg-main rounded-full">4</span>
        <h3 className="text-main font-semibold">Shipping</h3>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-red-500">*</span>
          <p>Weight with Package</p>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <CircleHelpIcon className="h-4 w-4 text-textColor" />
              </TooltipTrigger>
              <TooltipContent side="right">
                <div>
                  <p>Enter the weight of the product after it&apos;s packaged.</p>
                  <p>Product weight will affect the calculation of the shipping fee.</p>
                  <p>Ensure that the weight is supported by the carrier.</p>
                  <p>If there is a difference between the weight entered and the actual</p>
                  <p>weight, you may be required to make up the difference.</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="group w-fit">
          <div className="flex border rounded-sm w-fit group group-hover:border-main focus-within:border-main">
            <Select defaultValue="grams" onValueChange={handleChangeTypeWieght}>
              <SelectTrigger className="w-[160px] focus:ring-0 border-none shadow-none" icon={<ChevronDown />}>
                <SelectValue placeholder="Select weight" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grams">Grams(g)</SelectItem>
                <SelectItem value="kilograms">Kilograms(kg)</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Enter the product weight"
              value={weightValue}
              onChange={handleChangeWeightValue}
              onBlur={handleBlurInput}
              className="border-none focus-visible:ring-0 shadow-none"
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <p>Product Dimensions</p>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <CircleHelpIcon className="h-4 w-4 text-textColor" />
              </TooltipTrigger>
              <TooltipContent side="right">
                <div>
                  <p>Enter the product dimensions after it&apos;s packaged to calculate</p>
                  <p>the shipping fee based on the dimensions.</p>
                  <p>Product dimensions will affect the calculation of the shipping</p>
                  <p>fee. Ensure that the dimensions are supported by the carrier.</p>
                  <p>If there is a difference between the dimensions entered and the</p>
                  <p>difference.</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-xs text-textColor mt-1">Ensure the box weight and dimensions are accurate as they will be used to calculate the shipping fees and shipping method.</p>

        <div className="flex items-center gap-2 mt-3">
          <InputSize value={productDimensions.height} placeholder="Height" onChange={(value: string) => handleChangeProductDimensions(value, 'height')} classNameGenal="flex-1" />
          <InputSize value={productDimensions.width} placeholder="Width" onChange={(value: string) => handleChangeProductDimensions(value, 'width')} classNameGenal="flex-1" />
          <InputSize value={productDimensions.length} placeholder="Length" onChange={(value: string) => handleChangeProductDimensions(value, 'length')} classNameGenal="flex-1" />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <span className="text-red-500">*</span>
          <p>Delivery options</p>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <CircleHelpIcon className="h-4 w-4 text-textColor" />
              </TooltipTrigger>
              <TooltipContent side="right">
                <div>
                  <p>If you select &ldquo;Default&ldquo;, the product will be consistent with the</p>
                  <p>shop&apos;s delivery options;</p>
                  <p>If you select &ldquo;Customized&ldquo;, the product won&apos;t be changed with</p>
                  <p>the shop&apos;s delivery options except when a delivery option is</p>
                  <p>deleted from shop&apos;s delivery options.</p>
                  <p>If there is no available delivery option for the &ldquo;Customized&ldquo;</p>
                  <p>option, the product&apos;s delivery option will be changed to</p>
                  <p>&ldquo;Default&ldquo;.</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-10">
          <label
            htmlFor="delivery-default"
            onClick={() => {
              setDelivery('default')
              setShowInfo(true)
            }}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="radio"
              id="delivery-default"
              name="delivery-options"
              className="hidden peer" // Hide the radio button
              checked={delivery === 'default'}
              onChange={() => setDelivery('default')}
            />
            <div className="w-4 h-4 rounded-full border-2 border-gray-400 peer-checked:bg-white peer-checked:border-main peer-checked:border-4 transition-colors"></div>
            <span>Default</span>
          </label>
          <label
            htmlFor="delivery-custom"
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => {
              setDelivery('custom')
              setShowInfo(true)
            }}
          >
            <input
              type="radio"
              id="delivery-custom"
              name="delivery-options"
              className="hidden peer" // Hide the radio button
              checked={delivery === 'custom'}
              onChange={() => setDelivery('custom')}
            />
            <div className="w-4 h-4 rounded-full border-2 border-gray-400 peer-checked:bg-white peer-checked:border-main peer-checked:border-4 transition-all"></div>
            <span>Custom</span>
          </label>
        </div>

        {delivery === 'default' ? (
          <div className="px-3 mt-4">
            <p className="font-semibold text-sm">Estimated Shipping Fee: $3</p>

            <div className={clsx('flex items-center gap-2 shadow-md rounded-md px-3 border-l-4 border-main mt-2', {
              'hidden': !showInfo
            })}>
              <div className="self-start mt-1">
                <InfoIcon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[#0000008c]">
                  Shipping fee calculation is based on the actual weight or volumetric weight, whichever is higher. The estimated shipping fee of the product is calculated based on the weight of 10 kg and the locations of customer and seller. The actual shipping fee calculation is based on the weight/dimensions provided by the logistics partner. Calculations based on shipping to Hanoi by default.
                </p>
              </div>
              <div className="self-start text-textColor cursor-pointer">
                <XIcon className="w-4 h-4" onClick={() => setShowInfo(false)} />
              </div>
            </div>
          </div>
        ) : (
          <div className="px-3 mt-4">
            <div
              className="flex border-[1px] rounded-sm p-5 gap-2 cursor-pointer hover:border-main"
              onClick={(event) => {
                event.stopPropagation()
                setDeliveryOption(prev => ({ ...prev, standardShipping: !prev.standardShipping }))
              }}
            >
              <label
                htmlFor="delivery-standard"
                className="flex items-center space-x-2 cursor-pointer"
                onClick={(event) => {
                  event.stopPropagation()
                  setDeliveryOption(prev => ({ ...prev, standardShipping: !prev.standardShipping }))
                }}
              >
                <input
                  id="delivery-standard"
                  type="checkbox"
                  className="hidden peer"
                  checked={deliveryOption.standardShipping}
                  onChange={(e) => setDeliveryOption(prev => ({ ...prev, bulkyShipping: e.target.checked }))}
                />
                <div className="relative w-4 h-4 rounded-sm border-2 border-gray-400 peer-checked:bg-main peer-checked:border-main peer-checked:border-4 transition-all">
                  <div className="absolute -top-[2px] -left-[2px]">
                    <CheckIcon className="w-3 h-3 text-white" />
                  </div>
                </div>
              </label>
              <p className="font-semibold">Standard shipping</p>
              <p className="ml-2 text-textColor">Estimated Shipping Fee: $3</p>
            </div>
            <div
              className="flex border-[1px] p-5 rounded-sm gap-2 cursor-pointer hover:border-main mt-2"
              onClick={(event) => {
                event.stopPropagation()
                setDeliveryOption(prev => ({ ...prev, bulkyShipping: !prev.bulkyShipping }))
              }}
            >
              <label
                htmlFor="delivery-bulky"
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  id="delivery-bulky"
                  type="checkbox"
                  className="hidden peer"
                  checked={deliveryOption.bulkyShipping}
                  onChange={(e) => setDeliveryOption(prev => ({ ...prev, bulkyShipping: e.target.checked }))}
                />
                <div className="relative w-4 h-4 rounded-sm border-2 border-gray-400 peer-checked:bg-main peer-checked:border-main peer-checked:border-4 transition-all">
                  <div className="absolute -top-[2px] -left-[2px]">
                    <CheckIcon className="w-3 h-3 text-white" />
                  </div>
                </div>
              </label>
              <p className="font-semibold">Bulky shipping</p>
              <p className="ml-2 text-textColor">Estimated Shipping Fee: $4</p>
            </div>
            <div className={clsx('flex items-center gap-2 shadow-md rounded-md px-3 border-l-4 border-main mt-4', {
              'hidden': !showInfo
            })}>
              <div className="self-start mt-1">
                <InfoIcon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[#0000008c]">
                  This shipping fee is calculated based on the product weight or dimensions and provided for reference only. The fee is subject to change depending on the buyer and seller location.
                </p>
              </div>
              <div className="self-start text-textColor cursor-pointer">
                <XIcon className="w-4 h-4" onClick={() => setShowInfo(false)} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
