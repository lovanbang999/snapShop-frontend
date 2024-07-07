'use client'

import { authApiRequest } from '@/apiRequests/auth'
import { handleErrorApi } from '@/lib/utils'
import { useEffect } from 'react'

function Page() {
  // const { userId } = JSON.parse(localStorage.getItem('user') ?? '')
  // const refreshToken = JSON.parse(localStorage.getItem('refreshToken') ?? '')

  // console.log('userId: ', userId)
  // console.log('refreshToken: ', refreshToken)

  // useEffect(() => {
  //   const fetchRequest = async () => {
  //     try {
  //       const result = await authApiRequest.handleRefreshToken(userId, refreshToken)
  //       console.log('result:: ', result)
  //     } catch (error) {
  //       handleErrorApi({
  //         error
  //       })
  //     }
  //   }

  //   fetchRequest()
  // }, [userId, refreshToken])

  // const result = authApiRequest.refreshTokenFromNextClientToServer('6672a237a5d41541ab98d674', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjcyYTIzN2E1ZDQxNTQxYWI5OGQ2NzQiLCJlbWFpbCI6ImxvdmFuYmFuZ2JveDlAZ21haWwuY29tIiwiaWF0IjoxNzIwMzQ4NjE5LCJleHAiOjE3MjA5NTM0MTl9.GWHsf_rkgsgabCFc557dvXSqgjnysUPS4xk4IYa0hOk')

  return <div>Product</div>
}

export default Page
