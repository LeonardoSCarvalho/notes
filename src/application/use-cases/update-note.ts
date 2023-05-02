import { Note, NoteData, User } from "@/entities/"
import {
  ExistingTitleError,
  InvalidTitleError,
  NoteNotExistsError,
  UserNotExistsError,
} from "@/entities/errors/"
import { Either, left, right } from "@/shared/either"
import { NoteRepository, UserRepository } from "../ports/"

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
    const owner = User.create(user.email, user.password).value as User
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
