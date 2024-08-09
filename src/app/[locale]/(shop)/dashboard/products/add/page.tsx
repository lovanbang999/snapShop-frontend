import AddProductForm from '@/app/_components/shop/add-product/add-product-form'
import AddProductProvider from '@/components/shop/AddProductProvider'

export default function Page() {
  return (
    <AddProductProvider>
      <div className="h-full w-full flex justify-center px-10 overflow-y-auto scrollbar-custom">
        <AddProductForm />
      </div>
    </AddProductProvider>
  )
}
