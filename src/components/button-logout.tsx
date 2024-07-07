'use client'

import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { authApiRequest } from '@/apiRequests/auth'
import { handleErrorApi } from '@/lib/utils'
import { useAppContext } from '@/app/AppProvider'
import { toast } from './ui/use-toast'

function ButtonLogout() {

  const router = useRouter()
  const { setUser } = useAppContext()

  const handleLogout = async () => {
    try {
      const result = await authApiRequest.logoutFormNextClientToNextServer()

      toast({
        description: result?.payload?.message
      })

      router.push('/login')
    } catch (error) {
      handleErrorApi({
        error
      })
    } finally {
      setUser(null)
      localStorage.removeItem('sessionToken')
      router.refresh()
    }
  }

  return (
    <Button variant='secondary' className='bg-white text-main font-bold' onClick={handleLogout}>
      Logout
    </Button>
  )
}

export default ButtonLogout
