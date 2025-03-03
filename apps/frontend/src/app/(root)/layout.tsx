import dynamic from 'next/dynamic'

import Loading from '@/app/loading'
import CommonProvider from '@/providers/common-provider'

const Header = dynamic(() => import('@/components/shared/header'), {
  ssr: false,
  loading: () => <Loading />,
})

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CommonProvider>
      <div className=" min-h-screen w-screen max-w-3xl overflow-hidden bg-white">
        <Header />
        <div className="w-full min-h-[calc(100vh-70px)] text-gray-800">
          {children}
        </div>
      </div>
    </CommonProvider>
  )
}

export default RootLayout
