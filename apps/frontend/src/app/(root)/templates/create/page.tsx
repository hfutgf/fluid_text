import dynamic from 'next/dynamic'
import React from 'react'

import Loading from '@/app/loading'

const Create = dynamic(() => import('@/features/templates/create/create'), {
  ssr: false,
  loading: () => <Loading />,
})

const CreateTemplate = () => {
  return <Create />
}

export default CreateTemplate
