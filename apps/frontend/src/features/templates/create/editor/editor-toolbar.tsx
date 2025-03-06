"use client"

import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  BgColorsOutlined,
  BoldOutlined,
  CodeOutlined,
  FontColorsOutlined,
  FontSizeOutlined,
  ItalicOutlined,
  LinkOutlined,
  OrderedListOutlined,
  PictureOutlined,
  RedoOutlined,
  StrikethroughOutlined,
  TableOutlined,
  UnderlineOutlined,
  UndoOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons"
import type { Editor } from "@tiptap/react"
import type React from "react"
import { type ChangeEvent, useState } from "react"

import AntButton from "@/components/ui/button"
import AntDropDown from "@/components/ui/dropdown"
import AntDvider from "@/components/ui/dvider"
import AntInput from "@/components/ui/input/input"
import AntPopover from "@/components/ui/popover"
import AntTooltip from "@/components/ui/tooltip"

import type { ColorItem, HeadingItem, HighlightItem } from "./types"

interface EditorToolbarProps {
  editor: Editor
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  const [linkUrl, setLinkUrl] = useState("")

  const addImage = () => {
    const url = window.prompt("URL изображения")
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const setLink = () => {
    if (linkUrl === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: linkUrl }).run()
    setLinkUrl("")
  }

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  }

  const colorItems: ColorItem[] = [
    {
      key: "red",
      label: <div className="w-6 h-6 bg-red-500" onClick={() => editor.chain().focus().setColor("#ef4444").run()} />,
    },
    {
      key: "blue",
      label: <div className="w-6 h-6 bg-blue-500" onClick={() => editor.chain().focus().setColor("#3b82f6").run()} />,
    },
    {
      key: "green",
      label: <div className="w-6 h-6 bg-green-500" onClick={() => editor.chain().focus().setColor("#22c55e").run()} />,
    },
    {
      key: "yellow",
      label: <div className="w-6 h-6 bg-yellow-500" onClick={() => editor.chain().focus().setColor("#eab308").run()} />,
    },
    {
      key: "purple",
      label: <div className="w-6 h-6 bg-purple-500" onClick={() => editor.chain().focus().setColor("#a855f7").run()} />,
    },
    {
      key: "black",
      label: <div className="w-6 h-6 bg-black" onClick={() => editor.chain().focus().setColor("#000000").run()} />,
    },
  ]

  const highlightItems: HighlightItem[] = [
    {
      key: "yellow",
      label: (
        <div
          className="w-6 h-6 bg-yellow-200"
          onClick={() => editor.chain().focus().setHighlight({ color: "#fef9c3" }).run()}
        />
      ),
    },
    {
      key: "green",
      label: (
        <div
          className="w-6 h-6 bg-green-200"
          onClick={() => editor.chain().focus().setHighlight({ color: "#dcfce7" }).run()}
        />
      ),
    },
    {
      key: "blue",
      label: (
        <div
          className="w-6 h-6 bg-blue-200"
          onClick={() => editor.chain().focus().setHighlight({ color: "#dbeafe" }).run()}
        />
      ),
    },
    {
      key: "pink",
      label: (
        <div
          className="w-6 h-6 bg-pink-200"
          onClick={() => editor.chain().focus().setHighlight({ color: "#fce7f3" }).run()}
        />
      ),
    },
  ]

  const headingItems: HeadingItem[] = [
    {
      key: "h1",
      label: (
        <div className="text-xl font-bold" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          Heading 1
        </div>
      ),
    },
    {
      key: "h2",
      label: (
        <div className="text-lg font-bold" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          Heading 2
        </div>
      ),
    },
    {
      key: "h3",
      label: (
        <div className="text-base font-bold" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          Heading 3
        </div>
      ),
    },
    {
      key: "h4",
      label: (
        <div className="text-sm font-bold" onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}>
          Heading 4
        </div>
      ),
    },
    { key: "p", label: <div onClick={() => editor.chain().focus().setParagraph().run()}>Normal text</div> },
  ]

  const linkPopover = (
    <div className="flex flex-col gap-2 p-2 min-w-[250px]">
      <AntInput
        placeholder="https://example.com"
        value={linkUrl}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setLinkUrl(e.target.value)}
        onPressEnter={setLink}
      />
      <div className="flex justify-between gap-2">
        <AntButton size="small" onClick={() => setLinkUrl("")}>
          Clear
        </AntButton>
        <AntButton size="small" type="primary" onClick={setLink}>
          {editor.isActive("link") ? "Update Link" : "Add Link"}
        </AntButton>
      </div>
    </div>
  )

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50">
      <TextFormattingTools editor={editor} />
      <AntDvider type="vertical" />
      <AlignmentTools editor={editor} />
      <AntDvider type="vertical" />
      <ListTools editor={editor} />
      <AntDvider type="vertical" />
      <StyleTools editor={editor} colorItems={colorItems} highlightItems={highlightItems} headingItems={headingItems} />
      <AntDvider type="vertical" />
      <InsertTools editor={editor} addImage={addImage} insertTable={insertTable} linkPopover={linkPopover} />
      <AntDvider type="vertical" />
      <HistoryTools editor={editor} />
    </div>
  )
}

// Компоненты для групп инструментов

function TextFormattingTools({ editor }: { editor: Editor }) {
  return (
    <>
      <AntTooltip title="Bold">
        <AntButton
          type={editor.isActive("bold") ? "primary" : "default"}
          icon={<BoldOutlined />}
          onClick={() => editor.chain().focus().toggleBold().run()}
          size="small"
        />
      </AntTooltip>
      <AntTooltip title="Italic">
        <AntButton
          type={editor.isActive("italic") ? "primary" : "default"}
          icon={<ItalicOutlined />}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          size="small"
        />
      </AntTooltip>
      <AntTooltip title="Underline">
        <AntButton
          type={editor.isActive("underline") ? "primary" : "default"}
          icon={<UnderlineOutlined />}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          size="small"
        />
      </AntTooltip>
      <AntTooltip title="Strikethrough">
        <AntButton
          type={editor.isActive("strike") ? "primary" : "default"}
          icon={<StrikethroughOutlined />}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          size="small"
        />
      </AntTooltip>
      <AntTooltip title="Code">
        <AntButton
          type={editor.isActive("code") ? "primary" : "default"}
          icon={<CodeOutlined />}
          onClick={() => editor.chain().focus().toggleCode().run()}
          size="small"
        />
      </AntTooltip>
    </>
  )
}

function AlignmentTools({ editor }: { editor: Editor }) {
  return (
    <>
      <AntTooltip title="Align Left">
        <AntButton
          type={editor.isActive({ textAlign: "left" }) ? "primary" : "default"}
          icon={<AlignLeftOutlined />}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          size="small"
        />
      </AntTooltip>
      <AntTooltip title="Align Center">
        <AntButton
          type={editor.isActive({ textAlign: "center" }) ? "primary" : "default"}
          icon={<AlignCenterOutlined />}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          size="small"
        />
      </AntTooltip>
      <AntTooltip title="Align Right">
        <AntButton
          type={editor.isActive({ textAlign: "right" }) ? "primary" : "default"}
          icon={<AlignRightOutlined />}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          size="small"
        />
      </AntTooltip>
    </>
  )
}

function ListTools({ editor }: { editor: Editor }) {
  return (
    <>
      <AntTooltip title="Bullet List">
        <AntButton
          type={editor.isActive("bulletList") ? "primary" : "default"}
          icon={<UnorderedListOutlined />}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          size="small"
        />
      </AntTooltip>
      <AntTooltip title="Numbered List">
        <AntButton
          type={editor.isActive("orderedList") ? "primary" : "default"}
          icon={<OrderedListOutlined />}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          size="small"
        />
      </AntTooltip>
    </>
  )
}

interface StyleToolsProps {
  editor: Editor
  colorItems: ColorItem[]
  highlightItems: HighlightItem[]
  headingItems: HeadingItem[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function StyleTools({ editor, colorItems, highlightItems, headingItems }: StyleToolsProps) {
  return (
    <>
      <AntTooltip title="Text Color">
        <AntDropDown menu={{ items: colorItems }} placement="bottomLeft" trigger={["click"]}>
          <AntButton icon={<FontColorsOutlined />} size="small" />
        </AntDropDown>
      </AntTooltip>
      <AntTooltip title="Highlight">
        <AntDropDown menu={{ items: highlightItems }} placement="bottomLeft" trigger={["click"]}>
          <AntButton icon={<BgColorsOutlined />} size="small" />
        </AntDropDown>
      </AntTooltip>
      <AntTooltip title="Headings">
        <AntDropDown menu={{ items: headingItems }} placement="bottomLeft" trigger={["click"]}>
          <AntButton icon={<FontSizeOutlined />} size="small" />
        </AntDropDown>
      </AntTooltip>
    </>
  )
}

interface InsertToolsProps {
  editor: Editor
  addImage: () => void
  insertTable: () => void
  linkPopover: React.ReactNode
}

function InsertTools({ editor, addImage, insertTable, linkPopover }: InsertToolsProps) {
  return (
    <>
      <AntTooltip title="Insert Image">
        <AntButton icon={<PictureOutlined />} onClick={addImage} size="small" />
      </AntTooltip>
      <AntTooltip title="Insert Table">
        <AntButton icon={<TableOutlined />} onClick={insertTable} size="small" />
      </AntTooltip>
      <AntPopover content={linkPopover} title="Insert Link" trigger="click" placement="bottom">
        <AntButton type={editor.isActive("link") ? "primary" : "default"} icon={<LinkOutlined />} size="small" />
      </AntPopover>
    </>
  )
}

function HistoryTools({ editor }: { editor: Editor }) {
  return (
    <>
      <AntTooltip title="Undo">
        <AntButton
          icon={<UndoOutlined />}
          onClick={() => editor.chain().focus().undo().run()}
          size="small"
          disabled={!editor.can().undo()}
        />
      </AntTooltip>
      <AntTooltip title="Redo">
        <AntButton
          icon={<RedoOutlined />}
          onClick={() => editor.chain().focus().redo().run()}
          size="small"
          disabled={!editor.can().redo()}
        />
      </AntTooltip>
    </>
  )
}

