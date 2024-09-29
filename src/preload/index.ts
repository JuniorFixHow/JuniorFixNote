import {
  CreateNoteProps,
  DeleteNoteProps,
  GetNotesProps,
  ReadNotesProps,
  WriteNoteProps
} from '@shared/types'
import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the Browser window')
}

try {
  contextBridge.exposeInMainWorld('context', {
    locale: navigator.language,
    getNotes: (...args: Parameters<GetNotesProps>) => ipcRenderer.invoke('getNotes', ...args),
    readNote: (...args: Parameters<ReadNotesProps>) => ipcRenderer.invoke('readNote', ...args),
    writeNote: (...args: Parameters<WriteNoteProps>) => ipcRenderer.invoke('writeNote', ...args),
    createNote: (...args: Parameters<CreateNoteProps>) => ipcRenderer.invoke('createNote', ...args),
    deleteNote: (...args: Parameters<DeleteNoteProps>) => ipcRenderer.invoke('deleteNote', ...args)
  })
} catch (error) {
  console.log(error)
}
