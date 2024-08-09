'use client'

import { useEffect, useState } from 'react'
import { productRequest } from '@/apiRequests/product'
import ListProductForSale from '@/app/_components/shop/list-product-for-sale'
import TabNavigationForShop from '@/app/_components/shop/tab-navigation-for-shop'
import { useAppContext } from '@/app/AppProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { handleErrorApi } from '@/lib/utils'
import { ProductType } from '@/schemaValidations/product.schema'
import { SearchIcon, SquarePlusIcon } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function Page() {
  const { user } = useAppContext()
  const searchParams = useSearchParams()
  const tab = searchParams.get('type')
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState<ProductType[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const queryParams = new URLSearchParams(Array.from(searchParams.entries())).toString()
        if (user) {
          const response = await productRequest.getGenarelProductsFromClientToNextServer(queryParams, user.userId)
          setProducts(response.metaData)
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

  return (
    <section className="w-full h-full overflow-hidden p-10">
      {/* Action */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg text-[#71717A]">Product for sale</p>
          <p className="text-sm text-textColor">List of products currently for sale at the shop</p>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex bg-white rounded-md w-[500px] h-12">
            <Input placeholder="Search product here" className="h-full border-0 outline-none shadow-none focus-visible:ring-0 rounded-md" />
            <div className="flex items-center justify-center px-3 rounded-md">
              <SearchIcon className="text-textColor" />
            </div>
          </div>
          <Button asChild className="bg-main h-full">
            <Link href="/dashboard/products/add" className="flex items-center gap-2">
              <SquarePlusIcon />
              Add product
            </Link>
          </Button>
        </div>
      </div>
      {/* End action */}

      {/* List */}
      <div className="flex h-full flex-col mt-10">
        <TabNavigationForShop />
        {isLoading ? (
          <div className="w-full flex-1 flex items-center justify-center text-main">
            <span className="loading loading-dots loading-md"></span>
          </div>
        ) : (
          <ListProductForSale products={products} />
        )}
      </div>
      {/* End list */}
    </section>
  )
}
