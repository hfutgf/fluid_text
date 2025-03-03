import { LoadingOutlined } from '@ant-design/icons'
import { Flex } from 'antd'
import React from 'react'

import AntSpin from '@/components/ui/spin'

const Loading = () => {
  return (
    <Flex
      align="center"
      gap="middle"
      className="min-h-screen bg-white w-screen flex items-center justify-center"
    >
      <AntSpin
        className="animate-spin"
        indicator={
          <LoadingOutlined className="text-blue-600" style={{ fontSize: 32 }} />
        }
      />
    </Flex>
  )
}

export default Loading
