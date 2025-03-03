import dynamic from 'next/dynamic'

import Loading from '@/app/loading'

const Dashboard = dynamic(() => import('@/features/dashboard/dashboard'), {
  ssr: false,
  loading: () => <Loading />,
})

const Home = () => {
  return (
    <>
      <Dashboard />
    </>
  )
}

export default Home
