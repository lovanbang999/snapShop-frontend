import Header from '@/components/shop/header'
import NavbarForShop from '@/components/shop/navbar-for-shop'


export default function DashBoardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col h-screen w-screen">
      <Header />
      <main className="flex flex-1 overflow-hidden">
        <NavbarForShop />
        <div className="w-[calc(100vw-240px)] max-w-[calc(100vw-240px)] max-h-full bg-[#f5f5f5]">
          {children}
        </div>
      </main>
    </div>
  )
}
