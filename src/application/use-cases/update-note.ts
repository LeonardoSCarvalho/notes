import { ExistingTitleError } from "@/entities/errors/existing-title-error"
import { InvalidTitleError } from "@/entities/errors/invalid-title-error"
import { NoteNotExistsError } from "@/entities/errors/note-not-exists-error"
import { UserNotExistsError } from "@/entities/errors/user-not-exists-error"
import { Note } from "@/entities/note"
import { NoteData } from "@/entities/note-data"
import { User } from "@/entities/user"
import { Either, left, right } from "@/shared/either"
import { NoteRepository } from "../ports/note-repository"
import { UserRepository } from "../ports/user-repository"

export class UpdateNote {
  constructor(
    private readonly noteRepository: NoteRepository,
    private readonly userRepository: UserRepository
  ) {}

  public async perform(
    noteId: string,
    ownerEmail: string,
    changedNoteData: NoteData
  ): Promise<
    Either<
      | ExistingTitleError
      | InvalidTitleError
      | NoteNotExistsError
      | UserNotExistsError,
      boolean
    >
  > {
    const noteExists = await this.noteRepository.findById(noteId)
    if (!noteExists) return left(new NoteNotExistsError())
    const user = await this.userRepository.findByEmail(ownerEmail)
    if (!user) return left(new UserNotExistsError())
    const owner = User.create(user).value as User
    const noteOrError = Note.create(
      owner,
      changedNoteData.title,
      changedNoteData.content
    )
    if (noteOrError.isLeft()) return left(noteOrError.value)
    const notesFromUser = await this.noteRepository.findAllNotesFromUser(
      changedNoteData.id as string
    )
    const found = notesFromUser.find(
      (note) => note.title === changedNoteData.title
    )
    if (found) return left(new ExistingTitleError())
    if (changedNoteData.title) {
      await this.noteRepository.updateTitle(noteId, changedNoteData.title)
    }
    if (changedNoteData.content) {
      await this.noteRepository.updateContent(noteId, changedNoteData.content)
    }
    return right(true)
  }
}
