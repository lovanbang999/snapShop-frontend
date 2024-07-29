import Header from '@/components/shop/header'
import NavbarForShop from '@/components/shop/navbar-for-shop'


export default function DashBoardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex flex-1 overflow-hidden">
        <NavbarForShop />
        <div className="flex justify-center w-full max-h-full bg-[#f5f5f5] overflow-y-auto scrollbar-custom">
          {children}
        </div>
      </main>
    </div>
  )
}
