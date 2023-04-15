import { Note } from "@/entities/note"
import { NoteData } from "@/entities/note-data"
import { User } from "@/entities/user"
import { NoteRepository } from "../ports/note-repository"
import { UserRepository } from "../ports/user-repository"

export class CreateNote {
  constructor(
    private readonly noteRepository: NoteRepository,
    private readonly userRepository: UserRepository
  ) {}

  public async perform(request: NoteData): Promise<NoteData> {
    const owner = await this.userRepository.findUserByEmail(
      request.ownerEmail as string
    )
    if (!owner) throw new Error("User not found")
    const note = Note.create(
      User.create(owner).value as User,
      request.title,
      request.content
    ).value as Note
    return this.noteRepository.addNote({
      title: note.title.value,
      content: note.content,
      ownerId: owner?.id,
      ownerEmail: owner?.email,
    })
  }
}
