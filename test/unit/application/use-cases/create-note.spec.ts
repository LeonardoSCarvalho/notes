import { CreateNote } from "@/application/use-cases/create-note"
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
    expect(result).toEqual({
      id: "0",
      ownerId: "0",
      ownerEmail: validEmail,
      title: validTitle,
      content: validContent,
    })
  })
})
