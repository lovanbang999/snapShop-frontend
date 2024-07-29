import AddProductProvider from '@/components/shop/AddProductProvider'
import AddProductForm from '../../../../../_components/shop/add-product/add-product-form'

export default function Page() {
  return (
    <AddProductProvider>
      <div className="h-fit w-11/12 flex justify-center">
        <AddProductForm />
      </div>
    </AddProductProvider>
  )
}
