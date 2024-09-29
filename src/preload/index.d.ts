import {
  CreateNoteProps,
  DeleteNoteProps,
  GetNotesProps,
  ReadNotesProps,
  WriteNoteProps
} from '@shared/types'

declare global {
  interface Window {
    // electron: ElectronAPI
    // api: unknown
    context: {
      locale: string
      getNotes: GetNotesProps
      readNote: ReadNotesProps
      writeNote: WriteNoteProps
      createNote: CreateNoteProps
      deleteNote: DeleteNoteProps
    }
  }
}
