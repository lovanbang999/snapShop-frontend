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
          router.push(`/login?redirectFrom=${pathname.split('/').toSpliced(0, 2).join('/')}`)
          localStorage.removeItem('sessionToken')
          localStorage.removeItem('refreshToken')
        })

      return () => {
        controller.abort()
      }
    } else {
      router.push('/')
    }
  }, [sessionToken, router, pathname, setUser])

  return <div>Logout Page</div>
}

export default function Page() {
  return (
    <Suspense>
      <LogoutLogic />
    </Suspense>
  )
}
