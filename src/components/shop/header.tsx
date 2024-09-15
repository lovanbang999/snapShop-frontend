import Image from 'next/image'
import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Separator } from '@radix-ui/react-separator'
import { BellIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from 'lucide-react'
import DropdownMenuItemLogout from './drop-down-item-logout'
import { ModeToggle } from '../toggle-theme'

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

export default function Header() {
  const tag = 0

  return (
    <header className="flex items-center justify-between h-20 px-10 shadow-md border-b-[1px]">

      <div className="flex items-center gap-28">
        {/* Logo */}
        <div className="w-[100px]">
          <Link href='#'>
            <Image
              src="/logo-color.svg"
              width={140}
              height={140}
              alt="Logo"
              priority
            />
          </Link>
        </div>
        {/* End logo */}
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList className="text-lg">
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Product</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/* End breadcrumb */}
      </div>

      <div className="flex items-center gap-14">
        {/* Notificaton */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <BellIcon className="w-6 h-6 text-black"/>
              <span className="badge badge-sm indicator-item bg-main border-none text-badge-foreground">8</span>
            </div>
          </div>
          <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-[250px] bg-[#F5F5F5] shadow">
            <div className="card-body">
              <span className="font-bold text-lg">Notification</span>
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
              ):
                (
                  <Image
                    src='/no-notify.svg'
                    width={200}
                    height={300}
                    alt='No notification'
                    className='w-[200px] h-[300px] self-center'
                  />
                )
              }
              <div className="card-actions">
                <button className="btn btn-primary btn-block bg-main hover:bg-main text-white border-none">View Notification</button>
              </div>
            </div>
          </div>
        </div>
        {/* End notification */}

        <ModeToggle />

        {/* Change language */}
        <Select>
          <SelectTrigger className="w-fit focus:ring-0 border-none" icon={<ChevronDownIcon className='ml-2' />}>
            <SelectValue placeholder="English" defaultValue='en' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="vi">Vietnamese</SelectItem>
          </SelectContent>
        </Select>
        {/* End change language */}

        {/* Avatar */}
        <div className="flex items-center gap-6">
          <div className="h-8 w-[1px] bg-black"></div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" sideOffset={20} align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <DropdownMenuItemLogout />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* End avatar */}
      </div>
    </header>
  )
}
