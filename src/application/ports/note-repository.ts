import { NoteData } from "@/entities/note-data"

export interface NoteRepository {
  add(note: NoteData): Promise<NoteData>
  findAllNotesFromUser(userId: string): Promise<NoteData[]>
  findById(noteId: string): Promise<NoteData | null>
  remove(noteId: string): Promise<void>
  updateTitle(noteId: string, title: string): Promise<boolean>
  updateContent(noteId: string, content: string): Promise<boolean>
}
