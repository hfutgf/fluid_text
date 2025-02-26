import { Spin, SpinProps } from 'antd'
import { ReactNode } from 'react'

export default function AntSpin(props: SpinProps): ReactNode {
  return <Spin {...props} />
}
