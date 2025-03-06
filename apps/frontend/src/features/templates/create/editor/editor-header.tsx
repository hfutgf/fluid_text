import { ChangeEvent } from 'react'

import AntInput from '@/components/ui/input/input'

interface EditorHeaderProps {
  title: string
  setTitle: (title: string) => void
}

export function EditorHeader({ title, setTitle }: EditorHeaderProps) {
  return (
    <div className="mb-4">
      <AntInput
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        className="text-xl font-semibold border-none px-0"
        placeholder="Document Title"
        variant="borderless"
        size="large"
      />
    </div>
  )
}
