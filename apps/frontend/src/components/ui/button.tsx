import { Button, ButtonProps } from 'antd'
import { ReactNode } from 'react'

export default function AntButton(props: ButtonProps): ReactNode {
  return <Button {...props} />
}
