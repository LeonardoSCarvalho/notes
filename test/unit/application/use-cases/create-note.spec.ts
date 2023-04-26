import { CreateNote } from "@/application/use-cases/create-note"
import { UnregisteredUserError } from "@/entities/errors/invalid-owner-error"
import { NoteData } from "@/entities/note-data"
import { UserData } from "@/entities/user-data"
import { InMemoryNoteRepository } from "../repositories/in-memory-note-repository"
import { InMemoryUserRepository } from "../repositories/in-memory-user-repository"
import { NoteBuilder } from "./builders/note-builder"
import { UserBuilder } from "./builders/user-builder"

describe("Create note use case", () => {
  it("Should create new Note with valid data", async () => {
    const validRegiesterUser: UserData = UserBuilder.aUser().build()
    const validRequestNote: NoteData = NoteBuilder.aNote().build()
    const userRepository = new InMemoryUserRepository([validRegiesterUser])
    const noteRepository = new InMemoryNoteRepository([])
    const createNote = new CreateNote(noteRepository, userRepository)
    const result = await createNote.perform(validRequestNote)
    expect(result.isRight()).toBeTruthy()
    expect(result.value).not.toBeNull()
  })
  it("Should not create new Note if owner is invalid", async () => {
    const invalidRegiesterUser: UserData = UserBuilder.aUser()
      .withInvalidEmail()
      .build()
    const validRequestNote: NoteData = NoteBuilder.aNote().build()
    const userRepository = new InMemoryUserRepository([])
    const noteRepository = new InMemoryNoteRepository([])
    const createNote = new CreateNote(noteRepository, userRepository)
    const result = await createNote.perform({
      ownerEmail: invalidRegiesterUser.email,
      title: validRequestNote.title,
      content: validRequestNote.content,
    })
    expect(result.value).toEqual(new UnregisteredUserError())
  })
})
