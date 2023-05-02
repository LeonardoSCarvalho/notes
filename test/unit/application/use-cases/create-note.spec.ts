import { CreateNote } from "@/application/use-cases/create-note"
import { NoteData, UserData } from "@/entities/"
import { UnregisteredUserError } from "@/entities/errors/"
import {
  InMemoryNoteRepository,
  InMemoryUserRepository,
} from "../repositories/"
import { NoteBuilder, UserBuilder } from "./builders/"

describe("Create note use case", () => {
  const validRegiesterUser: UserData = UserBuilder.aUser().build()
  const userRepository = new InMemoryUserRepository([validRegiesterUser])
  const noteRepository = new InMemoryNoteRepository([])
  it("Should create new Note with valid data", async () => {
    const validRequestNote: NoteData = NoteBuilder.aNote().build()
    validRequestNote.title = "my note2"
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
    const createNote = new CreateNote(noteRepository, userRepository)
    const result = await createNote.perform({
      ownerEmail: invalidRegiesterUser.email,
      title: validRequestNote.title,
      content: validRequestNote.content,
    })
    expect(result.value).toEqual(new UnregisteredUserError())
  })
  it("Should not create note with unregistered owner", async () => {
    const usecase = new CreateNote(noteRepository, userRepository)
    const unregisteredEmail = "other@mail.com"
    const createNoteRequestWithUnregisteredOwner: NoteData =
      NoteBuilder.aNote().build()
    createNoteRequestWithUnregisteredOwner.ownerEmail = unregisteredEmail
    const result = await usecase.perform(createNoteRequestWithUnregisteredOwner)
    expect(result.value).toEqual(new UnregisteredUserError())
  })
  it("Should not create note with invalid title", async () => {
    const usecase = new CreateNote(noteRepository, userRepository)
    const validCreateNoteRequest: NoteData = NoteBuilder.aNote().build()
    await usecase.perform(validCreateNoteRequest)
    const error: Error = (await usecase.perform(validCreateNoteRequest))
      .value as Error
    expect(error).toEqual(new Error("ExistingTitleErrord"))
  })
})
