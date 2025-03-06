import { EllipsisOutlined, LeftOutlined } from '@ant-design/icons'
import { MenuProps } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import AntButton from '@/components/ui/button'
import AntDropDown from '@/components/ui/dropdown'

const templates = [
  {
    title: 'Resume',
    image:
      'https://ssl.gstatic.com/docs/templates/thumbnails/1IxwUTqGTAn2T4Jhjm7xU7ezSXqC21plOZmHKbbImh70_400.png',
    describe: 'With serifs',
  },
  {
    title: 'Resume',
    image:
      'https://ssl.gstatic.com/docs/templates/thumbnails/1IxwUTqGTAn2T4Jhjm7xU7ezSXqC21plOZmHKbbImh70_400.png',
    describe: 'With serifs',
  },
  {
    title: 'Resume',
    image:
      'https://ssl.gstatic.com/docs/templates/thumbnails/1IxwUTqGTAn2T4Jhjm7xU7ezSXqC21plOZmHKbbImh70_400.png',
    describe: 'With serifs',
  },
  {
    title: 'Resume',
    image:
      'https://ssl.gstatic.com/docs/templates/thumbnails/1IxwUTqGTAn2T4Jhjm7xU7ezSXqC21plOZmHKbbImh70_400.png',
    describe: 'With serifs',
  },
]

const items: MenuProps['items'] = [
  {
    key: '1',
    label: <Link href="/templates/create">Add template</Link>,
  },
]

const Templates = () => {
  return (
    <div className="w-screen bg-gray-50 shadow-sm">
      <div className="max-w-[1150px] mx-auto p-4">
        <div className="flex items-center justify-between">
          <h4 className="text-base text-gray-600">Create document</h4>
          <div className="flex items-center gap-0.5">
            <AntButton
              variant="outlined"
              size="large"
              className="border-none bg-gray-50 shadow-none hover:!bg-gray-300 hover:!text-gray-700 duration-100 rounded-md"
            >
              Template gallery
              <div className="flex flex-col">
                <LeftOutlined className="rotate-90 text-sm" />
                <LeftOutlined className="-rotate-90 text-sm" />
              </div>
            </AntButton>
            <div className="w-8 h-[1px] bg-gray-300 rotate-90" />

            <AntDropDown
              menu={{ items }}
              placement="bottomRight"
              arrow={{ pointAtCenter: true }}
            >
              <div className="py-1 px-0.5 rounded-md hover:bg-gray-300 duration-100 cursor-pointer">
                <EllipsisOutlined className="rotate-90 text-xl" />
              </div>
            </AntDropDown>
          </div>
        </div>
        <div className="mt-4 flex items-start gap-5">
          <Link href={'/templates/create'} className="flex flex-col gap-1">
            <div className="rounded-md hover:border border border-gray-300 hover:border-blue-500 overflow-hidden cursor-pointer">
              <Image
                src={
                  'https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png'
                }
                alt="template-img"
                width={144}
                height={186}
                className="w-[144px] h-[186px] rounded-md"
              />
            </div>
            <h5 className="text-gray-800 text-sm font-semibold">
              Empty document
            </h5>
          </Link>
          {templates.map((template, i) => (
            <div key={i} className="flex select-none flex-col gap-1">
              <div className="rounded-md hover:border border border-gray-300 hover:border-blue-500 overflow-hidden cursor-pointer">
                <Image
                  src={template.image}
                  alt="template-img"
                  width={144}
                  height={186}
                  className="w-[144px] h-[186px] rounded-md"
                />
              </div>
              <h5 className="text-gray-800 text-sm font-semibold">
                {template.title}
              </h5>
              <p className="text-gray-600 text-sm">{template.describe}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Templates
