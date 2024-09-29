import { NoteInfoProps } from '@shared/models'
import {
  CreateNoteProps,
  DeleteNoteProps,
  GetNotesProps,
  ReadNotesProps,
  WriteNoteProps
} from '@shared/types'
import { dialog } from 'electron'
import {
  ensureDir,
  readdir,
  readFile,
  readFileSync,
  remove,
  stat,
  writeFile,
  writeFileSync
} from 'fs-extra'
import { isEmpty } from 'lodash'
import { homedir } from 'os'
import path from 'path'
import welcomeNoteFile from '../../../resources/welcomeNote.md?asset'

export const getRootDir = () => {
  return `${homedir()}/JuniorFixNote`
}

export const getNotes: GetNotesProps = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const notefileNames = await readdir(rootDir, {
    encoding: 'utf8',
    withFileTypes: false
  })

  const notes = notefileNames.filter((fileName) => fileName.endsWith('.md'))

  if (isEmpty(notes)) {
    console.info('No notes found, creating a welcome note')
    const content = await readFileSync(welcomeNoteFile, { encoding: 'utf8' })
    await writeFile(`${rootDir}/Welcome.md`, content, { encoding: 'utf8' })
    notes.push('Welcome.md')
  }
  return Promise.all(notes.map(getNoteInfoFromFileName))
}

export const getNoteInfoFromFileName = async (filename: string): Promise<NoteInfoProps> => {
  const fileStats = await stat(`${getRootDir()}/${filename}`)
  return {
    title: filename.replace(/\.md$/, ''),
    lastEditTime: fileStats.mtimeMs
  }
}

export const readNote: ReadNotesProps = async (filename: string) => {
  const rootDir = getRootDir()
  return readFile(`${rootDir}/${filename}.md`, { encoding: 'utf8' })
}

export const writeNote: WriteNoteProps = async (filename, content) => {
  const rootDir = getRootDir()
  console.info(`$Writing note ${filename}`)
  return writeFile(`${rootDir}/${filename}.md`, content, { encoding: 'utf8' })
}

export const createNote: CreateNoteProps = async () => {
  const rootDir = getRootDir()
  await ensureDir(rootDir)
  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New note',
    defaultPath: `${rootDir}/Untitled.md`,
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'FixNote', extensions: ['md'] }]
  })
  if (canceled || !filePath) {
    console.info('Note creation canceled')
    return false
  }

  const { name: fileName, dir: parentDir } = path.parse(filePath)
  // console.log(parentDir, rootDir)

  const getRoot = rootDir.replace('/', '\\')
  if (parentDir !== getRoot) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Note creation failed',
      message: `All notes must be saved under ${getRoot}. Don't use other directories!`
    })
    return false
  }
  console.info(`Creating note: ${filePath}`)
  await writeFileSync(filePath, '')

  return fileName
}

export const deleteNote: DeleteNoteProps = async (fileName) => {
  const rootDir = getRootDir()
  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Delete note',
    message: `Are you sure you want to delete '${fileName}'?`,
    buttons: ['Yes', 'No'],
    defaultId: 1,
    cancelId: 1
  })

  if (response === 1) {
    console.info('Note deletion canceled')
    return false
  }

  console.info(`Deleting note: ${fileName}`)
  await remove(`${rootDir}/${fileName}.md`)
  return true
}
