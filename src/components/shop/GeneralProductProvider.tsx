'use client'

import { productRequest } from '@/apiRequests/product'
import { useAppContext } from '@/app/AppProvider'
import { handleErrorApi } from '@/lib/utils'
import { ProductType } from '@/schemaValidations/product.schema'
import { useSearchParams } from 'next/navigation'
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'

interface GeneralProductContextProps {
  isLoading: boolean,
  products: ProductType,
  pages: number,
  currentPage: number
  rowSelected: Record<number, boolean>
  setRowSelected: Dispatch<SetStateAction<Record<number, boolean>>>
}

const GeneralProductContext =
  createContext<GeneralProductContextProps>({
    isLoading: false,
    products: [],
    pages: 1,
    currentPage: 1,
    rowSelected: {},
    setRowSelected: () => {}
  })

export const useGeneralContext = () => {
  return useContext(GeneralProductContext)
}

export default function GeneralProductProvider({
  children
}: {
  children: React.ReactNode
}) {
  const { user } = useAppContext()
  const searchParams = useSearchParams()
  const tab = searchParams.get('type')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [products, setProducts] = useState<ProductType>([])
  const [pages, setPages] = useState<number>(1)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [rowSelected, setRowSelected] = useState<Record<number, boolean>>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const queryParams = new URLSearchParams(Array.from(searchParams.entries())).toString()
        if (user) {
          const response = await productRequest.getGenarelProductsFromClientToNextServer(queryParams, user.userId)
          setProducts(response.metaData.result)
          setPages(response.metaData.totalPages)
          setCurrentPage(response.metaData.currentPage)
        }
      } catch (error) {
        handleErrorApi({
          error
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [searchParams, tab, user, user?.userId])

  const valueContext = {
    isLoading,
    products,
    pages,
    currentPage,
    rowSelected,
    setRowSelected
  }

  return (
    <GeneralProductContext.Provider value={valueContext}>
      {children}
    </GeneralProductContext.Provider>
  )
}
