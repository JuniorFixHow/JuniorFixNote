import { useRef } from 'react'
import {
  Content,
  FloatingNoteTitle,
  MarkdownEditor,
  NotesPreviewList,
  RootLayout,
  Sidebar
} from './components'
import ActionButtonsRow from './components/ActionButtonsRow'

const App = () => {
  const contentContainerRef = useRef<HTMLDivElement>(null)
  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0)
  }
  return (
    <>
      {/* <DraggableTopBar /> */}
      <RootLayout>
        <Sidebar className="p-2 bg-slate-800">
          <ActionButtonsRow className="mb-2 flex flex-row justify-between" />
          <NotesPreviewList onSelect={resetScroll} className="mt-3 space-y-1" />
        </Sidebar>
        <Content ref={contentContainerRef} className="border-l bg-slate-700 border-l-white/20">
          <FloatingNoteTitle className="pt-2" />
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
