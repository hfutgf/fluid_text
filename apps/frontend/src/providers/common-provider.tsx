'use client'

import { useSession } from 'next-auth/react'
import NextTopLoader from 'nextjs-toploader'
import React from 'react'
import { ToastContainer } from 'react-toastify'

import Loading from '@/components/shared/loading'
import AntdRegistry from '@/providers/ant-registry'


const CommonProvider = ({ children }: { children: React.ReactNode }) => {
  const session = useSession()

  if (session.status === 'loading') return <Loading />

  return (
    <>
      <ToastContainer />
      <NextTopLoader
        color="#9333ea"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={true}
        easing="ease"
        speed={200}
        shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        zIndex={1600}
        showAtBottom={false}
      />
      <AntdRegistry>
      {children}
      </AntdRegistry>
    </>
  )
}

export default CommonProvider
