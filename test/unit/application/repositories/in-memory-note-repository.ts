import { NoteParams, NoteRepository } from "@/application/ports/note-repository"
import { NoteData } from "@/entities/note-data"

export class InMemoryNoteRepository implements NoteRepository {
  private notes: NoteData[] = []
  async addNote(note: NoteParams): Promise<NoteData> {
    const newNote = {
      ownerEmail: "any@mail.com",
      title: note.title,
      content: note.content,
    }
    this.notes.push(newNote)
    return newNote
  }
}
