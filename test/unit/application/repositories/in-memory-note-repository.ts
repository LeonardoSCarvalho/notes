import { NoteRepository } from "@/application/ports/note-repository"
import { NoteData } from "@/entities/note-data"

export class InMemoryNoteRepository implements NoteRepository {
  constructor(private _notes: NoteData[]) {}

  get notes(): NoteData[] {
    return this._notes
  }

  async addNote(note: NoteData): Promise<NoteData> {
    note.id = this._notes.length.toString()
    this._notes.push(note)
    return note
  }

  async findAllNotesFromUser(userId: string): Promise<NoteData[]> {
    const notes = this.notes.filter((note) => note.ownerId === userId)
    return notes
  }
}
