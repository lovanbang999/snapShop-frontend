import { productRequest } from '@/apiRequests/product'
import { HttpError } from '@/lib/http'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('sessionToken')?.value
  const queryParams = request.nextUrl.search
  const userId = request.headers.get('x-client-id')

  if (!accessToken) {
    return Response.json(
      { message: 'Did not receive session token!' },
      { status: 401 }
    )
  }

  if (!userId) {
    return Response.json(
      { message: 'Did not receive userId!' },
      { status: 401 }
    )
  }

  try {
    const result = await productRequest.getGenarelProductsFromNextServerToServer(queryParams, userId, accessToken)

    return Response.json(result.payload, { status: 200 })
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

  return Response.json('hehe')
}
