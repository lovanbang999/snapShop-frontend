'use client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'
import { authApiRequest } from '@/apiRequests/auth'
import { handleErrorApi } from '@/lib/utils'
import { useAppContext } from '@/app/AppProvider'
import { toast } from './ui/use-toast'

export default function MenuAvatar() {
  const router = useRouter()
  const { user, setUser } = useAppContext()

  const handleLogout = async () => {
    try {
      const result = await authApiRequest.logoutFormNextClientToNextServer(user?.userId)
      toast({
        description: result.message
      })

      window.location.replace('/login')
    } catch (error) {
      handleErrorApi({ error })
    } finally {
      setUser(null)
      localStorage.removeItem('sessionToken')
      localStorage.removeItem('refreshToken')
      router.refresh()
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" sideOffset={16} >
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
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
