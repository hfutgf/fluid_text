"use client"

import { DownloadOutlined, LoadingOutlined, SendOutlined } from "@ant-design/icons"
import Color from "@tiptap/extension-color"
import Highlight from "@tiptap/extension-highlight"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import ListItem from "@tiptap/extension-list-item"
import Table from "@tiptap/extension-table"
import TableCell from "@tiptap/extension-table-cell"
import TableHeader from "@tiptap/extension-table-header"
import TableRow from "@tiptap/extension-table-row"
import TextAlign from "@tiptap/extension-text-align"
import TextStyle from "@tiptap/extension-text-style"
import Underline from "@tiptap/extension-underline"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { message } from "antd"
import { useState } from "react"

import AntButton from "@/components/ui/button"
import AntCard from "@/components/ui/card"
import AntTabs from "@/components/ui/tabs"

import { EditorContent } from "./editor-content"
import { EditorHeader } from "./editor-header"
import { EditorToolbar } from "./editor-toolbar"
import { PreviewContent } from "./preview-content"

export function Editor() {
  const [title, setTitle] = useState("Untitled Document")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("edit")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [messageApi, contextHolder] = message.useMessage()

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right"],
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 underline",
        },
      }),
      Image.configure({
        allowBase64: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      ListItem,
    ],
    content:
      "<h2>Start writing your document...</h2><p>This is a simple document editor that allows you to create and edit rich text documents.</p>",
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[300px] max-w-none p-4",
      },
    },
  })

  const handleExport = () => {
    if (!editor) return

    const content = editor.getHTML()
    const blob = new Blob([content], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${title.replace(/\s+/g, "-").toLowerCase()}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!editor) {
    return <div>Loading editor...</div>
  }

  const items = [
    {
      key: "edit",
      label: "Edit",
      children: (
        <div className="border rounded-md mb-4">
          <EditorToolbar editor={editor} />
          <EditorContent editor={editor} />
        </div>
      ),
    },
    {
      key: "preview",
      label: "Preview",
      children: <PreviewContent html={editor.getHTML()} />,
    },
  ]

  return (
    <>
      {contextHolder}
      <AntCard className='max-w-[1150px] mx-auto rounded-none'>
        <EditorHeader title={title} setTitle={setTitle} />

        <AntTabs activeKey={activeTab} onChange={setActiveTab} items={items} className="mb-6" />

        <div className="flex justify-end gap-2">
          <AntButton size="large" icon={<DownloadOutlined />} onClick={handleExport}>
            Export
          </AntButton>
          <AntButton
            size="large"
            type="primary"
            disabled={isSaving}
            icon={isSaving ? <LoadingOutlined /> : <SendOutlined />}
          >
            {isSaving ? "Saving..." : "Save to Server"}
          </AntButton>
        </div>
      </AntCard>
    </>
  )
}

