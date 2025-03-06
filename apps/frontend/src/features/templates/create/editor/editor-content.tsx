import { Editor, EditorContent as TipTapEditorContent } from "@tiptap/react"

interface EditorContentProps {
  editor: Editor
}

export function EditorContent({ editor }: EditorContentProps) {
  return (
    <div className="p-4">
      <TipTapEditorContent editor={editor} />
    </div>
  )
}
