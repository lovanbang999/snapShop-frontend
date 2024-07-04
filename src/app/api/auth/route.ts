export async function POST(request: Request) {

  const res = await request.json()
  const sessionToken = res?.sessionToken?.accessToken
  if (!sessionToken) {
    return Response.json({ message: 'Did not receive sessionToken' }, {
      status: 400
    })
  }

  const userId = res?.user?._id
  if (!userId) {
    return Response.json({ message: 'Did not receive userId' }, {
      status: 400
    })
  }

  const headers = new Headers()
  headers.append('Set-Cookie', `sessionToken=${sessionToken}; Path=/; HttpOnly`)
  headers.append('Set-Cookie', `userId=${userId}; Path=/; HttpOnly`)

  return Response.json({ res }, {
    status: 200,
    headers: headers
  })
}
