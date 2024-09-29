import { MDXEditorMethods } from '@mdxeditor/editor'
import { saveNoteAtom, selectedNoteAtom } from '@renderer/store'
import { autoSavingNumber } from '@shared/constants'
import { NoteContentProp } from '@shared/models'
import { useAtomValue, useSetAtom } from 'jotai'
import { throttle } from 'lodash'
import { useRef } from 'react'

export const useMarkdownEditor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom)
  const saveNote = useSetAtom(saveNoteAtom)
  const editorRef = useRef<MDXEditorMethods>(null)

  const handleAutoSaving = throttle(
    async (content: NoteContentProp) => {
      if (!selectedNote) return
      console.info('Auto saving: ', selectedNote.title)
      await saveNote(content)
    },
    autoSavingNumber,
    { leading: false, trailing: true }
  )

  const handleBlur = async () => {
    if (!selectedNote) return
    handleAutoSaving.cancel()
    const content = editorRef.current?.getMarkdown()

    if (content != null) {
      await saveNote(content)
    }
  }

  return {
    editorRef,
    selectedNote,
    handleAutoSaving,
    handleBlur
  }
}
