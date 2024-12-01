import AddProductProvider from '@/components/shop/AddProductProvider'
import AddProductPage from './add-product-page'

export default function Page() {
  return (
    <AddProductProvider>
      <div className="h-full w-full flex justify-center px-10 overflow-y-auto scrollbar-custom gap-5">
        <AddProductPage />
      </div>
    </AddProductProvider>
  )
}
