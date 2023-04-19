import { NoteData } from "@/entities/note-data"

export interface NoteRepository {
  addNote(note: NoteData): Promise<NoteData>
  findAllNotesFromUser(userId: string): Promise<NoteData[]>
  findNote(noteId: string): Promise<NoteData | null>
  remove(noteId: string): Promise<void>
  updateTitle(noteId: string, title: string): Promise<boolean>
  updateContent(noteId: string, content: string): Promise<boolean>
}
