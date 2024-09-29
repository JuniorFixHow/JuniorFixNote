import { ComponentProps } from "react";
import { DeleteNoteButton, NewNoteButton } from "./Button";

export default function ActionButtonsRow({...props}:ComponentProps<'div'>) {
  return (
    <div {...props} >
        <NewNoteButton />
        <DeleteNoteButton />
    </div>
  )
}
