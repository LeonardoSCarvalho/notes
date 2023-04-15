import { NoteData } from "@/entities/note-data"

export type NoteParams = {
  title: string
  content: string
  ownerId?: string
}

export interface NoteRepository {
  addNote(note: NoteParams): Promise<NoteData>
}
