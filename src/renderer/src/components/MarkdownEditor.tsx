import {
  codeBlockPlugin,
  headingsPlugin,
  imagePlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  thematicBreakPlugin
} from '@mdxeditor/editor'
import { useMarkdownEditor } from '@renderer/hooks/useMarkdownEditor'

export const MarkdownEditor = () => {
  const { selectedNote, editorRef, handleAutoSaving, handleBlur } = useMarkdownEditor()
  if (!selectedNote) return null
  return (
    <MDXEditor
      ref={editorRef}
      onChange={handleAutoSaving}
      onBlur={handleBlur}
      //   className="bg-red-300"
      contentEditableClassName="outline-none min-h-screen max-w-none text-lg text-white px-4 pb-2 caret-yellow-500 prose pros-invert prose-p:my-3 prose-p: leading-relaxed prose-headings:my-4 prose-headings:text-white prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']"
      markdown={selectedNote.content}
      key={selectedNote.title}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        markdownShortcutPlugin(),
        thematicBreakPlugin(),
        codeBlockPlugin(),
        imagePlugin(),
        linkPlugin()
      ]}
    />
  )
}
