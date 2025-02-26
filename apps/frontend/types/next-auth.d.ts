/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth'

import { UserType } from '@/features/types/user.types'

declare module 'next-auth' {
  interface Session {
    user: UserType
    accessToken: string
  }
}
