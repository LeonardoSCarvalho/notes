import { Note } from "@/entities/note"
import { User } from "@/entities/user"

describe("Note entity", () => {
  it("Should be created if title and owner are valid", () => {
    const validOwner: User = User.create({
      email: "any@email.com",
      password: "any-password",
    }).value as User
    const validTitle = "any title"
    const note = Note.create(validOwner, validTitle).value as Note
    expect(note.title.value).toEqual(validTitle)
    expect(note.owner).toEqual(validOwner)
  })
})