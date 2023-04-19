import { NoteRepository } from "@/application/ports/note-repository"
import { NoteData } from "@/entities/note-data"
import { randomUUID } from "crypto"

export class InMemoryNoteRepository implements NoteRepository {
  constructor(private _notes: NoteData[]) {}

  async updateTitle(noteId: string, title: string): Promise<boolean> {
    const note = this.notes.find((note) => note.id === noteId)
    if (note) {
      note.title = title
      return true
    }
    return false
  }
  async updateContent(noteId: string, content: string): Promise<boolean> {
    const note = this.notes.find((note) => note.id === noteId)
    if (note) {
      note.content = content
      return true
    }
    return false
  }

  get notes(): NoteData[] {
    return this._notes
  }

  async addNote(note: NoteData): Promise<NoteData> {
    note.id = randomUUID()
    this._notes.push(note)
    return note
  }

  async findAllNotesFromUser(userId: string): Promise<NoteData[]> {
    const notes = this.notes.filter((note) => note.ownerId === userId)
    return notes
  }

  async findNote(noteId: string): Promise<NoteData | null> {
    const note = this.notes.find((note) => note.id === noteId) || null
    return note
  }

  async remove(noteId: string): Promise<void> {
    const note = await this.findNote(noteId)
    if (note) {
      const index = this.notes.indexOf(note)
      this.notes.splice(index, 1)
    }
  }
}
