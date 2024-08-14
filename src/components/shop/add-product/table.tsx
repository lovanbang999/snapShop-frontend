'use client'

import { ChangeEvent, Dispatch, memo, SetStateAction, useEffect, useRef, useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { ActualClassificationType } from '@/schemaValidations/product.schema'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import SelectImageInput from './select-image-input'
import { formatPrice } from '@/lib/utils'
import { useAddProductContext } from '@/components/shop/AddProductProvider'

interface CustomInputType {
  name: string;
  value?: string;
  indexRow: number;
  handleChangeValue: (event: ChangeEvent<HTMLInputElement>, indexRow: number) => void;
}
interface CustomNumberInputType extends Omit<CustomInputType, 'value'> {
  value?: number
}
interface CustomInputCurrencyType extends CustomInputType {}

interface CusTomPopoverType {
  triggerContent: string;
  hanldeDelete: (index: number) => void;
  indexRow: number;
}
const CustomInput = memo(function CustomInput ({ name, value, indexRow, handleChangeValue }: CustomInputType) {
  return (
    <div className="w-[200px] p-2">
      <input
        name={name}
        defaultValue={value || ''}
        onChange={(event) => handleChangeValue(event, indexRow)}
        className="w-full border rounded p-1 pl-3"
        placeholder="Enter" />
    </div>
  )
})

const CustomNumberInput = memo(function CustomInput ({ name, value, indexRow, handleChangeValue }: CustomNumberInputType) {
  return (
    <div className="w-[200px] p-2">
      <input
        type='number'
        name={name}
        defaultValue={value}
        min={1}
        onChange={(event) => handleChangeValue(event, indexRow)}
        className="w-full border rounded p-1 pl-3"
        placeholder="Enter" />
    </div>
  )
})

const CustomInputCurrency = memo(function CustomInput({ name, value, indexRow, handleChangeValue }: CustomInputCurrencyType ) {
  return (
    <div className="w-[200px] p-2">
      <div className="flex items-center border-[1px] rounded bg-white">
        <div className="content-center text-center w-10 text-textColor">$</div>
        <div className="w-[1px] bg-[#71717A4F] h-[20px]"></div>
        <input
          name={name}
          value={formatPrice(value) || ''}
          onChange={(event) => handleChangeValue(event, indexRow)}
          className="w-full border-none rounded p-1 pl-2"
          placeholder="Enter"
        />
      </div>
    </div>
  )
})


const CusTomPopover = ({ triggerContent, hanldeDelete, indexRow }: CusTomPopoverType) => {
  const [popoverOpen, setPopoverOpen] = useState(false)

  const handleDelte = () => {
    hanldeDelete(indexRow)
    setPopoverOpen(false)
  }

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger className="text-blue-500">{triggerContent}</PopoverTrigger>
      <PopoverContent side="right" sideOffset={10} className="flex flex-col gap-3 relative">
        <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rotate-45"></div>
        <p>Delete this SKU?</p>
        <div className="flex self-end gap-3">
          <Button variant="outline" onClick={() => setPopoverOpen(false)}>Cancel</Button>
          <Button
            type="button"
            variant="destructive"
            className="cursor-pointer text-white"
            onClick={handleDelte}
          >
            Delete
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default function Table({
  rows,
  setActualClassification,
  deleteRow
}: {
  rows: ActualClassificationType[] | [],
  setActualClassification: Dispatch<SetStateAction<ActualClassificationType[]> | ActualClassificationType[]>,
  deleteRow: (index: number) => void
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [atScrollStart, setAtScrollStart] = useState<boolean>(true)
  const [atScrollEnd, setAtScrollEnd] = useState<boolean>(false)
  const { actualClassification } = useAddProductContext()

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollContainerRef.current

      setAtScrollStart(scrollLeft === 0)
      setAtScrollEnd(scrollLeft + clientWidth >= (scrollWidth - 10))
    }
  }

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const handleChange = (event: ChangeEvent<HTMLInputElement>, indexRow: number) => {
    const { name, value } = event.target

    setActualClassification(prevValues => {
      const newState = [...prevValues]
      newState[indexRow] = {
        ...newState[indexRow],
        [name]: value
      }

      return newState
    })
  }

  const handleChangeValeCurrency = (event: ChangeEvent<HTMLInputElement>, indexRow: number) => {
    const { name, value } = event.target
    const rawValue = value.replace(/,/g, '')
    let convertValue = rawValue === '' ? undefined : Number(rawValue)

    setActualClassification(prevValues => {
      const newState = [...prevValues]
      newState[indexRow] = {
        ...newState[indexRow],
        [name]: convertValue
      }
      return newState
    })
  }

  return (
    <div ref={scrollContainerRef} className="relative flex w-fit overflow-x-scroll scrollbar-custom">
      <div className="sticky left-0" style={{ backgroundColor: atScrollStart ? 'transparent': '#f2f2f2', boxShadow: atScrollStart ? 'none': 'rgb(204, 204, 204) 0px 0px 20px' }}>
        <div className="flex h-[64px]">
          <p className="flex h-full w-[200px] p-2 text-left gap-2">SKU <span className="text-red-500">*</span></p>
        </div>
        <div>
          {rows.map((row, index) => (
            <div key={index} className="flex h-[53px] border-b">
              <CustomInput name="sku" value={row.sku} handleChangeValue={handleChange} indexRow={index} />
            </div>
          ))}
        </div>
      </div>

      <div className="w-fit border-collapse">
        {/* Header */}
        <div className="flex overflow-x-auto">
          <p className="h-[64px] w-[200px] p-2 text-left">SKU Code</p>
          <p className="h-[64px] w-[200px] p-2 text-left">Size</p>
          <p className="h-[64px] w-[200px] p-2 text-left">Color</p>
          <p className="h-[64px] w-[200px] p-2 text-left">Image</p>
          <p className="h-[64px] w-[200px] p-2 text-left">Barcode</p>
          <p className="h-[64px] w-[200px] p-2 text-left">Current Inventory (Normal Goods) <span className="text-red-500">*</span></p>
          <p className="h-[64px] w-[200px] p-2 text-left">Current Inventory (Faulty Goods)</p>
          <p className="h-[64px] w-[200px] p-2 text-left">Safety Inventory</p>
          <p className="h-[64px] w-[200px] p-2 text-left">Initial Entry Price <span className="text-red-500">*</span></p>
          <p className="h-[64px] w-[200px] p-2 text-left">Original Selling Price <span className="text-red-500">*</span></p>
        </div>
        {/* End header */}

        {/* Body */}
        <div>
          {rows.map((row, index) => (
            <div key={index} className="flex border-b w-fit">
              <CustomInput name="skuCode" value={row.skuCode} handleChangeValue={handleChange} indexRow={index} />
              <CustomInput name="size" value={row.size} handleChangeValue={handleChange} indexRow={index} />
              <CustomInput name="color" value={row.color} handleChangeValue={handleChange} indexRow={index} />
              <SelectImageInput indexOfRow={index} />
              <CustomInput name="barcode" value={row.barcode} handleChangeValue={handleChange} indexRow={index} />
              <CustomNumberInput name="normalGoodsInventory" value={row.normalGoodsInventory} handleChangeValue={handleChange} indexRow={index} />
              <CustomNumberInput name="faultyGoodsInventory" value={row.faultyGoodsInventory} handleChangeValue={handleChange} indexRow={index} />
              <CustomNumberInput name="saftyInventory" value={row.saftyInventory} handleChangeValue={handleChange} indexRow={index} />
              <CustomInputCurrency name="initialEntryPrice" value={row.initialEntryPrice?.toString()} handleChangeValue={handleChangeValeCurrency} indexRow={index} />
              <CustomInputCurrency name="originalSellingPrice" value={row.originalSellingPrice?.toString()} handleChangeValue={handleChangeValeCurrency} indexRow={index} />
            </div>
          ))}
        </div>
        {/* End body */}
      </div>

      <div className="sticky right-[-1px]" style={{ backgroundColor: atScrollEnd ? 'transparent': '#f2f2f2', boxShadow: atScrollEnd ? 'none': 'rgb(204, 204, 204) 0px 0px 20px' }}>
        <div className="flex h-[64px]">
          <p className="h-full w-[100px] p-2 text-left">Status</p>
          <p className="h-full w-[100px] p-2 text-left">Action</p>
        </div>
        <div>
          {rows.map((row, index) => (
            <div key={index} className="flex h-[53px] border-b">
              <div className="flex items-center h-full w-[100px] p-2">
                <Switch defaultChecked={row.status} />
              </div>
              <div className="flex items-center h-full w-[100px] p-2">
                <CusTomPopover triggerContent="Delete" indexRow={index} hanldeDelete={deleteRow} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
