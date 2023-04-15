import { NoteData } from "@/entities/note-data"

export interface NoteRepository {
  addNote(note: NoteData): Promise<NoteData>
  findAllNotesFromUser(userId: string): Promise<NoteData[]>
}
