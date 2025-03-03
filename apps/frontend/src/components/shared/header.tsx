'use client'

import { SearchOutlined } from '@ant-design/icons'
import Image from 'next/image'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import React, { useState } from 'react'

import AntButton from '@/components/ui/button'
import AntInput from '@/components/ui/input/input'

const Header = () => {
  const session = useSession()
  const [search, setSearch] = useState('')
  const [focused, setFocused] = useState(false)

  return (
    <div className="min-h-[70px] text-gray-800 w-full flex items-center justify-between shadow-md px-4">
      <div className="flex items-end">
        <Image
          src={'/images/logo.png'}
          alt="Logo"
          width={48}
          height={48}
          className="w-12 h-12 rounded-lg"
        />
        <h1 className="text-3xl font-bold uppercase">luid text</h1>
      </div>

      <div className="max-w-[500px] w-[500px] min-w-[144px]">
        <div className="relative">
          {!focused && !search && (
            <div className="absolute z-[50] flex items-center gap-2 top-2 left-3 text-gray-400">
              <SearchOutlined className="text-xl" />
              <span>Search</span>
            </div>
          )}
          <AntInput
            className="w-full rounded-2xl"
            size="large"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </div>
      </div>

      <div>
        {session.status === 'authenticated' ? (
          <AntButton
            onClick={() => signOut({ callbackUrl: '/auth/login' })}
            className="bg-blue-600 text-white font-semibold rounded-md"
            size="large"
          >
            Sign out
          </AntButton>
        ) : (
          <Link href={'/auth/login'}>
            <AntButton
              className="bg-blue-600 text-white font-semibold rounded-md"
              size="large"
            >
              Login
            </AntButton>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header
