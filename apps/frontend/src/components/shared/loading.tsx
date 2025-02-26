import { LoadingOutlined } from '@ant-design/icons'
import { Flex } from 'antd'
import React from 'react'

import AntSpin from '@/components/ui/spin'

const Loading = () => {
  return (
    <Flex align="center" gap="middle">
      <AntSpin
        indicator={
          <LoadingOutlined
            className="text-white"
            style={{ fontSize: 48 }}
            spin
          />
        }
      />
    </Flex>
  )
}

export default Loading
