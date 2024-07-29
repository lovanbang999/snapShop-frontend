'use client'

import { ChangeEvent, useState } from 'react'
import CustomTooltip from '@/components/custom-tooltip'
import Table from './table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PlusIcon, X } from 'lucide-react'
import QicklyAddSku from './qickly-add-sku'
import { useAddProductContext } from '../../../../components/shop/AddProductProvider'
import _ from 'lodash'
import { formatPrice } from '@/lib/utils'

interface InputApplyAllType {
  normalGoodsInventory?: number;
  faultyGoodsInventory?: number;
  saftyInventory?: number;
  initialEntryPrice?: number;
  originalSellingPrice?: number;
}

interface CustomNumberInputType {
  titleLabel: string;
  idInput: string;
  nameInput: string;
  valueInput?: number;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface CustomInputCurrencyType extends Omit<CustomNumberInputType, 'valueInput'> {
  valueInput?: string;
}

const CustomNumberInput = ({ titleLabel, idInput, nameInput, valueInput, handleChange }: CustomNumberInputType) => {
  return (
    <div>
      <CustomTooltip text={titleLabel} >
        <label htmlFor={idInput} className="text-textColor text-lg mb-1 line-clamp-1">
          {titleLabel}
        </label>
      </CustomTooltip>
      <Input type="number" id={idInput} value={valueInput || ''} name={nameInput} placeholder="Enter" onChange={handleChange} min={1} className="bg-white h-12 border-2" />
    </div>
  )
}

const CustomInputCurrency = ({ titleLabel, idInput, nameInput, valueInput, handleChange }: CustomInputCurrencyType) => {
  return (
    <div>
      <CustomTooltip text={titleLabel} >
        <label htmlFor={idInput} className="text-textColor text-lg mb-1 line-clamp-1">
          {titleLabel}
        </label>
      </CustomTooltip>
      <Input id={idInput} value={formatPrice(valueInput) || ''} name={nameInput} placeholder="Enter" onChange={handleChange} className="bg-white h-12 border-2" />
    </div>
  )
}

export default function ActualClassification() {
  const { actualClassification, setActualClassification } = useAddProductContext()
  const [inputApplyAll, setInputApplyAll] = useState<InputApplyAllType>({})

  const handleAddSku = () => {
    setActualClassification(prev => ([...prev, { sku: '', status: true }]))
  }

  const handleDeleteSku = (indexRow: number) => {
    const newActualClassification = actualClassification.filter((_, index) => index !== indexRow)
    setActualClassification(newActualClassification)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setInputApplyAll(values => ({ ...values, [name]: Number(value) }))
  }

  const handleChangeCurrency = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const rawValue = value.replace(/,/g, '')
    let convertValue = rawValue === '' ? undefined : Number(rawValue)

    if (!isNaN(Number(rawValue))) {
      setInputApplyAll(values => ({ ...values, [name]: convertValue }))
    }
  }

  const handleAppliesToAll = () => {
    if (actualClassification.length <= 0 || _.isEmpty(inputApplyAll)) return

    setActualClassification(prev => {
      const newStateClass = [...prev]
      const resultStateClass = newStateClass.map(stateClass => ({ ...stateClass, ...inputApplyAll }))

      return resultStateClass
    })
    setInputApplyAll({})
  }

  return (
    <div className="flex flex-col h-fit w-full px-28 py-10 mt-10 rounded-sm bg-white space-y-8">
      <h5 className="text-2xl font-bold text-main">Actual classification (SKU)</h5>

      <div className="bg-blurred-bg w-full flex items-end p-4 rounded-md border-[1px]">
        <p className="self-center block w-52 font-bold text-textColor mr-2">Batch processing</p>
        <div className="flex items-center gap-3">
          <CustomNumberInput
            titleLabel="Current inventory (normal goods)"
            idInput="inventory-normal-goods"
            nameInput='normalGoodsInventory'
            valueInput={inputApplyAll?.normalGoodsInventory}
            handleChange={handleChange}
          />
          <CustomNumberInput
            titleLabel="Current inventory (faulty goods)"
            idInput="inventory-faulty-goods"
            nameInput='faultyGoodsInventory'
            valueInput={inputApplyAll?.faultyGoodsInventory}
            handleChange={handleChange}
          />
          <CustomNumberInput
            titleLabel="Safty inventory"
            idInput="safty-inventory"
            nameInput='saftyInventory'
            valueInput={inputApplyAll?.saftyInventory}
            handleChange={handleChange}
          />
          <CustomInputCurrency
            titleLabel="Initial entry price"
            idInput="initial-entry-price"
            nameInput='initialEntryPrice'
            valueInput={inputApplyAll?.initialEntryPrice?.toString()}
            handleChange={handleChangeCurrency}
          />
          <CustomInputCurrency
            titleLabel="Original selling price"
            idInput="original-selling-price"
            nameInput='originalSellingPrice'
            valueInput={inputApplyAll?.originalSellingPrice?.toString()}
            handleChange={handleChangeCurrency}
          />
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleAppliesToAll}
          disabled={actualClassification.length <= 0 || _.isEmpty(inputApplyAll)}
          className="px-10 border-main text-main hover:text-main ml-10"
        >
          Applies to all
        </Button>
      </div>

      <div className="bg-blurred-bg w-full flex items-end px-4 py-2 rounded-md border-[1px]">
        <Table rows={actualClassification} setActualClassification={setActualClassification} deleteRow={handleDeleteSku} />
      </div>

      <div className="self-end flex gap-10">
        <QicklyAddSku />
        <Button type="button" variant="outline" onClick={handleAddSku} className="flex items-center gap-2 justify-center text-textColor border-textColor hover:text-textColor">
          Add SKU
          <PlusIcon />
        </Button>
      </div>
    </div>
  )
}
