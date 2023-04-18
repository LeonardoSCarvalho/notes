import { NoteRepository } from "../ports/note-repository"

export class RemoveNote {
  constructor(private readonly noteRepository: NoteRepository) {}

  async perform(noteId: string): Promise<void> {
    await this.noteRepository.remove(noteId)
  }
}
