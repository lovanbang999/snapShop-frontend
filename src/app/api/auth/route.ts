export async function POST(request: Request) {
  const res = await request.json()
  const sessionToken = res?.sessionToken?.accessToken
  if (!sessionToken) {
    return Response.json({ message: 'Did not receive sessionToken' }, {
      status: 400
    })
  }

  return Response.json({ res }, {
    status: 200,
    headers: { 'Set-Cookie': `sessionToken=${sessionToken}; Path=/; HttpOnly` }
  })
}
