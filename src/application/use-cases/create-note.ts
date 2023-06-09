import { Note, NoteData, User } from "@/entities/"
import { UnregisteredUserError } from "@/entities/errors/invalid-owner-error"
import { Either, left, right } from "@/shared/either"
import { NoteRepository, UserRepository } from "../ports/"

export class CreateNote {
  constructor(
    private readonly noteRepository: NoteRepository,
    private readonly userRepository: UserRepository
  ) {}

  public async perform(
    request: NoteData
  ): Promise<Either<UnregisteredUserError, NoteData>> {
    const owner = await this.userRepository.findByEmail(
      request.ownerEmail as string
    )
    if (!owner) return left(new UnregisteredUserError())
    const notes = await this.noteRepository.findAllNotesFromUser(
      owner.id as string
    )
    const verifyTitle = notes.find((note) => note.title === request.title)
    if (verifyTitle) return left(new Error("ExistingTitleErrord"))
    const userOwner = User.create(owner.email, owner.password).value as User
    const note = Note.create(userOwner, request.title, request.content)
      .value as Note
    return right(
      await this.noteRepository.add({
        title: note.title.value,
        content: note.content,
        ownerId: owner?.id,
        ownerEmail: owner?.email,
      })
    )
  }
}
