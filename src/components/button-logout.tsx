'use client'

import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { authApiRequest } from '@/apiRequests/auth'
import { handleErrorApi } from '@/lib/utils'
import { useAppContext } from '@/app/AppProvider'

function ButtonLogout() {

  const router = useRouter()
  const { setUser } = useAppContext()

  const handleLogout = async () => {
    try {
      await authApiRequest.logoutFormNextClientToNextServer()

      router.push('/login')
      setUser({ userId: '', email: '', username: '', sessionToken: '', refreshToken: '' })
    } catch (error) {
      handleErrorApi({
        error
      })
    }
  }

  return (
    <Button variant='secondary' className='bg-white text-main font-bold' onClick={handleLogout}>
      Logout
    </Button>
  )
}

export default ButtonLogout
