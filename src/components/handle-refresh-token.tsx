'use client'

import { useEffect } from 'react'
import { decodeJWT, handleErrorApi } from '@/lib/utils'
import { PayloadJWT } from '@/schemaValidations/jwt.chema'
import { differenceInHours } from 'date-fns'
import { authApiRequest } from '@/apiRequests/auth'
import { useAppContext } from '@/app/AppProvider'


// Set time interval is: 30 minutes
const TIME_INTERVAL = 1000 * 60 * 30

function HandleRefreshToken() {
  const { user, setUser } = useAppContext()

  useEffect(() => {
    const interval = setTimeout( async () => {
      const now = new Date().toUTCString()

      const _refreshToken = localStorage.getItem('refreshToken')

      if (_refreshToken) {
        const refreshToken = JSON.parse(_refreshToken)

        const { exp } = decodeJWT<PayloadJWT>(refreshToken)
        const expiredAt = new Date(exp * 1000).toUTCString()

        if (differenceInHours(expiredAt, now) < 1) {
          try {
            const res = await authApiRequest.refreshTokenFromNextClientToServer(user?.userId as string, refreshToken)
            const { _id: userId, username, email } = res?.payload?.metaData?.user
            const { accessToken, refreshToken: newRefreshToken } = res?.payload?.metaData?.tokens

            await authApiRequest.auth({ sessionToken: accessToken })

            localStorage.setItem('refreshToken', JSON.stringify(newRefreshToken))
            localStorage.setItem('sessionToken', JSON.stringify(accessToken))
            setUser({ userId, username, email })
          } catch (error) {
            handleErrorApi({
              error
            })
          }
        }
      }


    }, TIME_INTERVAL)

    return () => clearInterval(interval)
  }, [user, setUser])
  return null
}

export default HandleRefreshToken
