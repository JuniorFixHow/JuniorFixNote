import { NoteContentProp, NoteInfoProps } from './models'

export type GetNotesProps = () => Promise<NoteInfoProps[]>
export type ReadNotesProps = (title: NoteInfoProps['title']) => Promise<NoteContentProp>

export type WriteNoteProps = (
  title: NoteInfoProps['title'],
  content: NoteContentProp
) => Promise<void>

export type CreateNoteProps = () => Promise<NoteInfoProps['title'] | false>
export type DeleteNoteProps = (title: NoteInfoProps['title']) => Promise<boolean>
