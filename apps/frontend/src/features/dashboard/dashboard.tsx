'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

import AntButton from '@/components/ui/button'
import MyDocuments from '@/features/dashboard/my-documents'
import Templates from '@/features/dashboard/templates'

const Dashboard = () => {
  const session = useSession()

  return (
    <div className="w-full h-full min-h-[calc(100vh-70px)]">
      {session.status === 'authenticated' ? (
        <>
          <Templates />
          <MyDocuments />
        </>
      ) : (
        <div className="min-h-[calc(100vh-70px)] max-w-[1024px] mx-auto flex items-center justify-center gap-8 w-full">
          <div>
            <div>
              <Image
                src={
                  'https://storage.googleapis.com/gweb-workspace-assets/uploads/7uffzv9dk4sn-7kAnuMn2JYM8SouH9sUO1Y-5decaa2561233114d97a43fceaa78f4f-Docs_Full_Logo.svg'
                }
                alt="Google docs"
                className="w-[178px] h-[36px]"
                width={178}
                height={36}
              />
            </div>
            <h2 className="text-[54px] mt-4 font-bold leading-[64px]">
              Online documents for domestic work
            </h2>
            <Link href={'/auth/login'}>
              <AntButton
                className="bg-blue-600 text-white font-semibold rounded-md mt-6 text-xl p-5"
                size="large"
              >
                Login
              </AntButton>
            </Link>
          </div>
          <div>
            <Image
              src="https://lh3.googleusercontent.com/Z46v0WUwJTOMu4_KY4Z46AFSfo5C4z3UdTMOsbHKDI4tRRsK3fElJVKzmUapYydds5tifA-XXelhBaNtI0x9Un4DnyN2VPlu_nQv8A=e365-pa-nu-rw-w1416"
              alt="Main img"
              className="w-[720px] h-[450px]"
              width={720}
              height={450}
              priority
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
