interface PreviewContentProps {
    html: string
  }

  export function PreviewContent({ html }: PreviewContentProps) {
    return (
      <div className="border rounded-md p-6 min-h-[400px]">
        <div dangerouslySetInnerHTML={{ __html: html }} className="prose max-w-none" />
      </div>
    )
  }

