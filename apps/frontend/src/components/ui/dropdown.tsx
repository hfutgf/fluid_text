import { Dropdown, DropDownProps } from 'antd'
import { ReactNode } from 'react'

export default function AntDropDown(props: DropDownProps): ReactNode {
  return <Dropdown {...props} />
}
