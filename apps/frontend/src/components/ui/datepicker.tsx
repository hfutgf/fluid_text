import { DatePicker, DatePickerProps } from 'antd'
import { ReactNode } from 'react'

export default function AntDatePicker(props: DatePickerProps): ReactNode {
  return <DatePicker {...props} />
}
