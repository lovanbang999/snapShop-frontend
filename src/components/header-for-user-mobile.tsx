import Image from 'next/image'
import { Button } from './ui/button'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Separator } from './ui/separator'
import { ScrollArea } from './ui/scroll-area'
import { UserIcon } from '@heroicons/react/16/solid'

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

function HeaderForUserMobile() {
  const tag = 0
  return (
    <header className="md:hidden fixed z-50 w-dvw bg-main h-[120px]">
      <div className="navbar flex-col items-center justify-center h-full lg:px-32">

        {/* Nav */}
        <div className="w-full flex items-center justify-between mb-2">

          {/* Menu */}
          <div>
            <div className="drawer">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer" className="btn btn-ghost drawer-button bg-transparent text-white">
                  <Bars3Icon className="w-5 h-5" />
                </label>
              </div>
              <div className="drawer-side z-10">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="menu bg-[#F5F5F5] text-black min-h-full w-80 p-0">
                  {/* Sidebar content here */}
                  <div className="flex items-center bg-main text-white h-[80px] p-3">
                    <div className="flex items-center justify-center bg-white rounded-2xl w-14 h-14 mr-3">
                      <UserIcon className="w-12 h-8 text-[#CCC]" />
                    </div>
                    <div>
                      <Link href="/login" className="text-xl font-semibold">Login</Link>
                      <p className="text-base">Login to receive more offerss</p>
                    </div>
                  </div>
                  <ul className="p-4">
                    <li><a>Notification</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Logo */}
          <div className="w-[100px]">
            <Link href='#'>
              <Image
                src="/logo.svg"
                width={120}
                height={120}
                alt="Logo"
              />
            </Link>
          </div>

          {/* Cart */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <ShoppingCartIcon className="w-6 h-6 text-white" />
                <span className="badge badge-sm indicator-item bg-white border-none text-third">0</span>
              </div>
            </div>
            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-[250px] bg-[#F5F5F5] shadow">
              <div className="card-body">
                <span className="font-bold text-lg">Cart</span>
                {!!tag ? (
                  <ScrollArea className="h-72 rounded-md border">
                    <div className="p-4">
                      {tags.map((tag) => (
                        <>
                          <div key={tag} className="cursor-pointer text-sm">
                            {tag}
                          </div>
                          <Separator className="my-2" />
                        </>
                      ))}
                    </div>
                  </ScrollArea>
                ) :
                  (
                    <Image
                      src='/no-cart.svg'
                      width={200}
                      height={300}
                      alt='No cart'
                      className='self-center'
                    />
                  )
                }
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block bg-main hover:bg-main text-white border-none">View cart</button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Search */}
        <div className="flex items-center w-[320px] h-[40%] bg-white rounded-sm">
          <input type="text" placeholder="Search product here..." className="flex-1 h-full pl-2 bg-transparent text-main border-none outline-none placeholder:text-main"/>
          <Button variant="ghost">
            <MagnifyingGlassIcon className='w-6 h-6 text-main'/>
          </Button>
        </div>

      </div>
    </header>
  )
}

export default HeaderForUserMobile
