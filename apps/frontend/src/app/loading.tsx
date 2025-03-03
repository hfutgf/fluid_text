import { LoadingOutlined } from '@ant-design/icons'
import React from 'react'

const Loading = () => {
  return (
    <div className="w-screen h-screen bg-white flex items-center justify-center">
      <LoadingOutlined  className="text-blue-500 animate-spin text-[32px]" />
    </div>
  )
}

export default Loading
