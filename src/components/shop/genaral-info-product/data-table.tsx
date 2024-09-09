'use client'

import { useEffect, useState } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import Image from 'next/image'
import { useGeneralContext } from '../GeneralProductProvider'
import { useSearchParams } from 'next/navigation'
import PaginationDataTable from './pagination-data-table'
import { ProductType } from '@/schemaValidations/product.schema'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>) {
  const { isLoading, pages, setRowSelected } = useGeneralContext()
  const searchParams = useSearchParams()
  const query = Object.fromEntries(searchParams.entries())
  const [rowSelection, setRowSelection] = useState<Record<number, boolean>>({})
  const [pageSize, setPageSize] = useState(30)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection
    },
    initialState: {
      pagination: {
        pageSize
      }
    },
    enableRowSelection: true
  })

  useEffect(() => {
    const pageSize = query?.pageSize

    if (!Number.isNaN(pageSize)) {
      setPageSize(Number(pageSize))
    } else {
      setPageSize(5)
    }
  }, [query?.pageSize, searchParams, setRowSelected, table])

  useEffect(() => {
    setRowSelected(rowSelection)
  }, [rowSelection, setRowSelected])

  return (
    <div className="flex flex-col w-full">
      <div className="flex-1 rounded-md border-b">
        <Table className={data.length === 0 || isLoading ? 'h-full' : ''}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow className="h-full">
                <TableCell colSpan={columns.length} className="">
                  <div className="w-full h-full flex-1 flex items-center justify-center text-main">
                    <span className="loading loading-dots loading-md"></span>
                  </div>
                </TableCell>
              </TableRow>
            ) :
              (
                table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                      className="bg-white"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length}>
                      <div className="flex flex-col items-center">
                        <Image
                          src='/no-product.svg'
                          width={50}
                          height={50}
                          alt='No product'
                        />
                        <p className="text-main font-semibold text-xl">This list is empty!</p>
                        <p>There are currently no products to display</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>
      </div>

      {pages > 1 && !isLoading && (
        <PaginationDataTable />
      )}
    </div>
  )
}
