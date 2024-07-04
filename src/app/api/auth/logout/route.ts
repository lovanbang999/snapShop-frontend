import { authApiRequest } from '@/apiRequests/auth'
import { HttpError } from '@/lib/http'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const cookieStore = cookies()

  const sessionToken = cookieStore.get('sessionToken')
  if (!sessionToken) {
    return Response.json(
      { message: 'Did not receive session token!' },
      { status: 401 }
    )
  }

  const userId = cookieStore.get('userId')
  if (!userId) {
    return Response.json(
      { message: 'Did not receive userId!' },
      { status: 401 }
    )
  }

  try {
    const result = await authApiRequest.logoutFormNextServerToServer( userId.value, sessionToken.value )

    const headers = new Headers()

    // Delete cookies
    headers.append('Set-Cookie', 'sessionToken=; Path=/; HttpOnly; Max-Age=0')
    headers.append('Set-Cookie', 'userId=; Path=/; HttpOnly; Max-Age=0')

    return Response.json(result.payload, {
      status: 200,
      headers: headers
    })
  } catch (error: any) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status
      })
    } else {
      return Response.json(
        { message: 'An unknow error occurred!' },
        { status: 500 }
      )
    }
  }
}
