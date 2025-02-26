import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { verifyJWT } from 'utils/verifyToken'

import { UserType } from '@/features/types/user.types'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const publicPaths = ['/auth/login', '/auth/register']

  const session = (await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })) as { user: UserType; accessToken: string } | null

  if (session?.accessToken) {
    try {
      await verifyJWT(session.accessToken, process.env.NEXTAUTH_SECRET!)

      if (publicPaths.includes(pathname)) {
        return NextResponse.redirect(new URL('/', req.url))
      }

      return NextResponse.next()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      const res = NextResponse.redirect(new URL('/auth/login', req.url))
      res.cookies.set('next-auth.session-token', '', { expires: new Date(0) })
      return res
    }
  }

  if (!publicPaths.includes(pathname)) {
    const res = NextResponse.redirect(new URL('/auth/login', req.url))
    res.cookies.set('next-auth.session-token', '', { expires: new Date(0) })
    return res
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
