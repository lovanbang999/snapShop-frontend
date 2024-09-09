import { DataTable } from './data-table'
import { columns } from './colums'
import { useGeneralContext } from '../GeneralProductProvider'

export default function ListProductForSale() {
  const { products } = useGeneralContext()

  return (
    <div className="flex-1 flex flex-wrap gap-5 scrollbar-custom">
      <DataTable columns={columns} data={products} />
    </div>
  )
}
