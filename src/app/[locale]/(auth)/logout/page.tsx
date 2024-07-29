'use client'

import { authApiRequest } from '@/apiRequests/auth'
import { useAppContext } from '@/app/AppProvider'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'

function LogoutLogic() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { setUser } = useAppContext()

  const sessionToken = searchParams.get('sessionToken')

  useEffect(() => {
    const controller = new AbortController()

    const signal = controller.signal

    if (sessionToken === JSON.parse(localStorage.getItem('sessionToken') ?? '')) {
      authApiRequest
        .logoutFormNextClientToNextServer(undefined, undefined, signal)
        .then((res: any) => {
          setUser(null)
          router.push(`/login?redirectFrom=${pathname.split('/en')[1].toString()}`)
          localStorage.removeItem('sessionToken')
          localStorage.removeItem('refreshToken')
        })

      return () => {
        controller.abort()
      }
    }
  }, [sessionToken, router, pathname, setUser])

  return <div>Logout Page</div>
}


function Page() {
  return (
    <Suspense>
      <LogoutLogic />
    </Suspense>
  )
}

export default Page
