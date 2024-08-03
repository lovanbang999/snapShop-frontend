'use client'

import { authApiRequest } from '@/apiRequests/auth'
import { useAppContext } from '@/app/AppProvider'
import { toast } from '@/components/ui/use-toast'
import { handleErrorApi } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
  const { setUser } = useAppContext()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const code = searchParams.get('code')
    if (code) {
      const fetchRequest = async (code: string) => {
        try {
          const result = await authApiRequest.handleGoogleCallback(code)

          await authApiRequest.auth({ sessionToken: result?.payload?.metaData?.tokens?.accessToken })

          toast({
            description: result?.payload?.message
          })

          const { _id: userId, email, username } = result?.payload?.metaData?.user

          setUser({ userId, email, username })
          localStorage.setItem('refreshToken', JSON.stringify(result?.payload?.metaData?.tokens?.refreshToken))
          localStorage.setItem('sessionToken', JSON.stringify(result?.payload?.metaData?.tokens?.accessToken))

          router.push('/')
          router.refresh()
        } catch (error) {
          handleErrorApi({
            error
          })
        }
      }

      fetchRequest(code)
    }

    router.push('/')
  }, [searchParams, router, setUser])

  return (
    <div className='w-dvw h-dvh flex flex-col items-center justify-center'>
      <span className="loading loading-dots loading-lg text-main"></span>
    </div>
  )
}
