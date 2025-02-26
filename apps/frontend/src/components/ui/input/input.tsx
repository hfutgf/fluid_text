import { Input, InputProps, InputRef } from 'antd'
import React, { forwardRef } from 'react'

const AntInput = forwardRef<InputRef, InputProps>((props, ref) => {
  return <Input ref={ref} {...props} />
})

AntInput.displayName = 'AntInput'

export default AntInput
