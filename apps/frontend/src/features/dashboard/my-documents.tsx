import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  ExportOutlined,
} from '@ant-design/icons'
import { MenuProps } from 'antd'
import dayjs from 'dayjs'
import Image from 'next/image'
import React from 'react'

import AntDropDown from '@/components/ui/dropdown'

const templates = [
  {
    title: 'Resume',
    image:
      'https://ssl.gstatic.com/docs/templates/thumbnails/1IxwUTqGTAn2T4Jhjm7xU7ezSXqC21plOZmHKbbImh70_400.png',
    createdAt: new Date().toISOString(),
  },
  {
    title: 'Resume',
    image:
      'https://ssl.gstatic.com/docs/templates/thumbnails/1IxwUTqGTAn2T4Jhjm7xU7ezSXqC21plOZmHKbbImh70_400.png',
    createdAt: new Date().toISOString(),
  },
  {
    title: 'Resume',
    image:
      'https://ssl.gstatic.com/docs/templates/thumbnails/1IxwUTqGTAn2T4Jhjm7xU7ezSXqC21plOZmHKbbImh70_400.png',
    createdAt: new Date().toISOString(),
  },
  {
    title: 'Resume',
    image:
      'https://ssl.gstatic.com/docs/templates/thumbnails/1IxwUTqGTAn2T4Jhjm7xU7ezSXqC21plOZmHKbbImh70_400.png',
    createdAt: new Date().toISOString(),
  },
]

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'Rename',
    icon: <EditOutlined />,
  },
  {
    key: '2',
    label: 'Delete',
    icon: <DeleteOutlined />,
  },
  {
    key: '3',
    label: 'Open in a new tab',
    icon: <ExportOutlined />,
  },
]

const MyDocuments = () => {
  return (
    <div className="w-screen bg-white">
      <div className="max-w-[1150px] mx-auto p-4">
        <div className="flex items-center justify-between">
          <h4 className="text-base text-gray-800">Recent documents</h4>
        </div>
        <div className="mt-4 flex items-start gap-5">
          {templates.map((template, i) => (
            <div
              key={i}
              className="flex flex-col gap-1 w-[210px] select-none rounded-md hover:border border border-gray-300 hover:border-blue-500 overflow-hidden cursor-pointer"
            >
              <div className="p-2 border-b">
                <Image
                  src={template.image}
                  alt="template-img"
                  width={144}
                  height={186}
                  className="w-[144px] h-[186px] rounded-md"
                />
              </div>
              <div className="p-3">
                <h5 className="text-gray-800 text-sm font-medium">
                  {template.title}
                </h5>
                <div className="flex items-center justify-between gap-1">
                  <p className="text-gray-600 text-sm">
                    {dayjs(template.createdAt).format('D MMM. YYYY г.')}
                  </p>
                  <AntDropDown menu={{ items }}>
                    <div className="p-1 rounded-full hover:bg-gray-300 duration-100 cursor-pointer">
                      <EllipsisOutlined className="rotate-90 text-xl" />
                    </div>
                  </AntDropDown>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyDocuments
