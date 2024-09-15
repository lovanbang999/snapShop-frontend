'use client'

import { useAppContext } from '@/app/AppProvider'
import { Button } from './ui/button'
import { authApiRequest } from '@/apiRequests/auth'
import { toast } from './ui/use-toast'
import { handleErrorApi } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export default function ButtonLogout() {
  const { user, setUser } = useAppContext()
  const router = useRouter()

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
    <Button variant='secondary' className='bg-white text-main font-bold' onClick={handleLogout}>
      Logout
    </Button>
  )
}
