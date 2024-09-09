'use client'

import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'
import { formatCurrency } from '@/lib/utils'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
  _id: string
  name: string
  thumb: {
    url: string;
    publicId: string;
  }
  status: string
  price: string
  quantity: number
  category: string
  createdAt: string
}

interface CusTomPopoverType {
  triggerContent: 'Edit' | 'Deactive' | 'Active';
  content: string;
  onClick: (...args: any) => void;
}

const CusTomPopover = ({ triggerContent, content, onClick }: CusTomPopoverType) => {
  const [popoverOpen, setPopoverOpen] = useState(false)

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger
        className={clsx('text-main', {
          'text-[#ed4543]': triggerContent === 'Deactive'
        })}
      >
        {triggerContent}
      </PopoverTrigger>
      <PopoverContent side="right" sideOffset={10} className="flex flex-col gap-3 relative">
        <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rotate-45"></div>
        <p>{content}</p>
        <div className="flex self-end gap-3">
          <Button variant="outline" onClick={() => setPopoverOpen(false)}>Cancel</Button>
          <Button
            type="button"
            variant={triggerContent === 'Deactive' ? 'destructive' : 'default'}
            className={clsx('cursor-pointer text-white', {
              'bg-main': triggerContent === 'Edit' || triggerContent === 'Active'
            })}
            onClick={() => onClick()}
          >
            OK
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export const columns: ColumnDef<Product>[] = [
  {
    id: 'selects',
    header: ({ table }) => (
      <Checkbox
        className=""
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(!!value)
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    )
  },
  {
    accessorKey: 'name',
    header: 'Name Product',
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-start gap-2">
          <Image
            src={row.original.thumb.url}
            width={50}
            height={50}
            quality={100}
            alt='Image product'
            className="h-[50px] w-[50px]"
          />
          <p className="w-[340px] line-clamp-2">{row.getValue('name')}</p>
        </div>
      )
    }
  },
  {
    accessorKey: 'category',
    header: 'Category'
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      const stringPrice = row.getValue('price') as string

      if (stringPrice.includes(' - ')) {
        const [firtStringPrice, secondStringPrice] = stringPrice.split(' - ')

        const firtCurrency = formatCurrency(firtStringPrice)
        const secondCurrency = formatCurrency(secondStringPrice)

        return <div className="text-left">{`${firtCurrency} - ${secondCurrency}`}</div>
      } else {
        const formatted = formatCurrency(stringPrice)

        return <div className="text-left">{formatted}</div>
      }
    }
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity'
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt')).toDateString()
      return (
        <div>{date}</div>
      )
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return (
        <div
          className={clsx('flex w-fit items-center justify-center px-3 py-1 gap-2 rounded-full capitalize', {
            'text-[#50974F] bg-[#50974F33]': row.getValue('status') === 'active',
            'text-[#FF3D00] bg-[#FF3D0033]': row.getValue('status') === 'deactive'
          })}
        >
          <div className={clsx('w-3 h-3 rounded-full', {
            'bg-[#50974F]': row.getValue('status') === 'active',
            'bg-[#FF3D00]': row.getValue('status') === 'deactive'
          })}></div>
          {row.getValue('status')}
        </div>
      )
    }
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const product = row.original

      const handleClick = () => {
        console.log(product._id)
      }

      return (
        <div className="flex flex-col items-start gap-2">
          <CusTomPopover triggerContent="Edit" content='Do you want edit?' onClick={handleClick} />
          {product.status.toLocaleLowerCase() === 'active' ?
            <CusTomPopover triggerContent="Deactive" content='Do you want deactive?' onClick={handleClick} />
            :
            <CusTomPopover triggerContent="Active" content='Do you want active?' onClick={handleClick} />
          }
        </div>
      )
    }
  }
]
