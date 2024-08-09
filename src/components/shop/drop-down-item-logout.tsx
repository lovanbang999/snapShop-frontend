'use client'

import { useRouter } from 'next/navigation'
import { authApiRequest } from '@/apiRequests/auth'
import { handleErrorApi } from '@/lib/utils'
import { useAppContext } from '@/app/AppProvider'
import { toast } from '../ui/use-toast'

export default function DropdownMenuItemLogout() {
  const router = useRouter()
  const { user, setUser } = useAppContext()

  const handleLogout = async () => {
    try {
      const result = await authApiRequest.logoutFormNextClientToNextServer(user?.userId)
      toast({
        description: result.message
      })

      router.push('/login')
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
    <div onClick={handleLogout} className="w-full h-full">
      Logout
    </div>
  )
}
