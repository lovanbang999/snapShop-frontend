import Image from 'next/image'
import { Button } from './ui/button'
import { BellIcon, MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Separator } from './ui/separator'
import { ScrollArea } from './ui/scroll-area'
import ButtonLogout from './button-logout'
import { cookies } from 'next/headers'
import { ModeToggle } from './toggle-theme'

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

function HeaderForUserLargeDevice() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')?.value

  const tag = 0

  return (
    <header className="hidden md:block fixed z-50 w-dvw bg-main h-[70px] shadow-md">
      <div className="navbar h-full px-7 lg:px-32">
        <div className="flex flex-1 mr-4">
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

          {/* Search */}
          <div className="flex items-center w-[280px] lg:w-[540px] h-[80%] bg-white rounded-sm ml-10 lg:ml-28">
            <input type="text" placeholder="Search product here..." className="w-[80%] lg:flex-1 h-full pl-2 bg-transparent text-main border-none outline-none placeholder:text-main"/>
            <Button variant="ghost" className='rounded-r-sm ml-1'>
              <MagnifyingGlassIcon className='w-6 h-6 text-main'/>
            </Button>
          </div>
        </div>

        {/* Toggle mode */}
        <ModeToggle />

        {/* Action */}
        <div className="flex-none gap-5 ml-3 lg:gap-10">
          {/* Cart */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <ShoppingCartIcon className="w-6 h-6 text-white" />
                <span className="badge badge-sm indicator-item bg-badge border-none text-badge-foreground">0</span>
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
                      className='w-auto h-auto self-center'
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

          {/* Notificaton */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <BellIcon className="w-6 h-6 text-white"/>
                <span className="badge badge-sm indicator-item bg-badge border-none text-badge-foreground">8</span>
              </div>
            </div>
            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-[250px] bg-[#F5F5F5] shadow">
              <div className="card-body">
                <span className="font-bold text-lg">Notification</span>
                {!!tags ? (
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
                ):
                  (
                    <Image
                      src='/no-notify.svg'
                      width={200}
                      height={300}
                      alt='No notification'
                      className='self-center'
                    />
                  )
                }
                <div className="card-actions">
                  <button className="btn btn-primary btn-block bg-main hover:bg-main text-white border-none">View Notification</button>
                </div>
              </div>
            </div>
          </div>

          {/* Login btn */}
          {sessionToken ? (
            <ButtonLogout />
          ):
            (<Link href="/login" className='px-4'>
              <Button variant='secondary' className='bg-white text-main font-bold'>
              Login
              </Button>
            </Link>)
          }
        </div>
      </div>
    </header>
  )
}

export default HeaderForUserLargeDevice
