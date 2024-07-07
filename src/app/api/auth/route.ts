import { decodeJWT } from '@/lib/utils'
import { PayloadJWT } from '@/schemaValidations/jwt.chema'

export async function POST(request: Request) {

  const res = await request.json()
  const sessionToken = res?.sessionToken
  if (!sessionToken) {
    return Response.json({ message: 'Did not receive sessionToken' }, {
      status: 400
    })
  }

  const payload = decodeJWT<PayloadJWT>(sessionToken)
  const expiredDate = new Date(payload.exp * 1000).toUTCString()

  return Response.json({ res }, {
    status: 200,
    headers: {
      'Set-Cookie': `sessionToken=${sessionToken}; Path=/; HttpOnly; Expires=${expiredDate}; SameSite=Lax; Secure`
    }
  })
}
