import { CreateNote } from "@/application/use-cases/create-note"
import { UnregisteredUserError } from "@/entities/errors/invalid-owner-error"
import { InMemoryNoteRepository } from "../repositories/in-memory-note-repository"
import { InMemoryUserRepository } from "../repositories/in-memory-user-repository"

describe("Create note use case", () => {
  it("Should create new Note with valid data", async () => {
    const validEmail = "any@mail.com"
    const validTitle = "any_title"
    const validContent = "any_content"
    const validPassword = "123any_password"
    const userRepository = new InMemoryUserRepository([
      { email: validEmail, password: validPassword, id: "0" },
    ])
    const noteRepository = new InMemoryNoteRepository([])
    const createNote = new CreateNote(noteRepository, userRepository)
    const result = await createNote.perform({
      ownerEmail: validEmail,
      title: validTitle,
      content: validContent,
    })
    expect(result.isRight()).toBeTruthy()
    expect(result.value).not.toBeNull()
  })
  it("Should not create new Note if owner is invalid", async () => {
    const validEmail = "any@mail.com"
    const validTitle = "any_title"
    const validContent = "any_content"
    const userRepository = new InMemoryUserRepository([])
    const noteRepository = new InMemoryNoteRepository([])
    const createNote = new CreateNote(noteRepository, userRepository)
    const result = await createNote.perform({
      ownerEmail: validEmail,
      title: validTitle,
      content: validContent,
    })
    expect(result.value).toEqual(new UnregisteredUserError())
  })
})
