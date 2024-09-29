import { cn, formatDateFromMs } from '@renderer/utils'
import { NoteInfoProps } from '@shared/models'
import { ComponentProps } from 'react'

export type NotePreviewProps = NoteInfoProps & {
  isActive?: boolean
} & ComponentProps<'div'>

export const NotePreview = ({
  title,
  lastEditTime,
  className,
  content,
  isActive = false,
  ...props
}: NotePreviewProps) => {
  return (
    <div
      {...props}
      className={cn(
        'cursor-pointer px-2.5 py-3 rounded-md transition-colors duration-75',
        {
          'bg-zinc-400/75': isActive,
          'hover:bg-zinc-500/75': !isActive
        },
        className
      )}
    >
      <h3 className='mb-1 font-bold truncate' >{title}</h3>
      <span className='inline-block w-full mb-2 text-xs font-light text-left' >{formatDateFromMs(lastEditTime)}</span>
    </div>
  )
}
