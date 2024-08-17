import { authApiRequest } from '@/apiRequests/auth'
import { HttpError } from '@/lib/error.http'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const res = await request.json()

  const force = res.force as boolean | undefined

  if (force) {
    return Response.json(
      { message: 'Froced logout successfully!' },
      {
        status: 200,
        headers: {
          'Set-Cookie': 'sessionToken=; Path=/; HttpOnly; Max-Age=0'
        }
      }
    )
  }

  const cookieStore = cookies()

  const sessionToken = cookieStore.get('sessionToken')
  if (!sessionToken) {
    return Response.json(
      { message: 'Did not receive session token!' },
      { status: 401 }
    )
  }

  const userId = res.userId
  if (!userId) {
    return Response.json(
      { message: 'Did not receive userId!' },
      { status: 401 }
    )
  }

  try {
    const result = await authApiRequest.logoutFormNextServerToServer(userId, sessionToken.value)

    return Response.json(result, {
      status: 200,
      headers: {
        'Set-Cookie': 'sessionToken=; Path=/; HttpOnly; Max-Age=0'
      }
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
