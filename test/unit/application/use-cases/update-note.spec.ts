import { UpdateNote } from "@/application/use-cases/update-note"
import { NoteData } from "@/entities/note-data"
import { InMemoryNoteRepository } from "../repositories/in-memory-note-repository"
import { InMemoryUserRepository } from "../repositories/in-memory-user-repository"

describe("Updated Notes use case", () => {
  it("Should update a note", async () => {
    const noteRepository = new InMemoryNoteRepository([
      {
        id: "1",
        title: "Title",
        content: "Content",
        ownerId: "1",
      },
    ])
    const userRepository = new InMemoryUserRepository([
      { id: "1", email: "any@email.com", password: "123any_password" },
    ])
    const updateNote = new UpdateNote(noteRepository, userRepository)
    const updatedNote: NoteData = {
      title: "New Title",
      content: "New Content",
    }
    const result = await updateNote.perform("1", "any@email.com", updatedNote)
    const notes = await noteRepository.findAllNotesFromUser("1")
    expect(notes).toEqual([{ ...updatedNote, id: "1", ownerId: "1" }])
    expect(result.value).toBeTruthy()
  })
})
