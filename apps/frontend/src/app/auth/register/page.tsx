'use client'

import dynamic from 'next/dynamic'
import React from 'react'

import Loading from '@/components/shared/loading'

const Register = dynamic(() => import('@/features/auth/register'), {
  ssr: false,
  loading: () => <Loading />,
})

const RegisterPage = () => {
  return <Register />
}

export default RegisterPage
