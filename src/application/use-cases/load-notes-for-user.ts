import { NoteRepository } from "../ports/note-repository"

export class LoadNotesForUser {
  constructor(private readonly noteRepository: NoteRepository) {}
  public async perform(requestUserId: string) {
    return this.noteRepository.findAllNotesFromUser(requestUserId)
  }
}
