import { UpdateNote } from "@/application/use-cases/update-note"
import { NoteData } from "@/entities/note-data"
import {
  InMemoryNoteRepository,
  InMemoryUserRepository,
} from "../repositories/"
import { NoteBuilder } from "./builders/note-builder"

describe("Updated Notes use case", () => {
  it("Should update a note", async () => {
    const aNote = NoteBuilder.aNote().build()
    aNote.id = "0"
    const noteRepository = new InMemoryNoteRepository([aNote])
    const userRepository = new InMemoryUserRepository([
      { email: "any@mail.com", password: "1validpassword", id: "0" },
    ])
    const updateNote = new UpdateNote(noteRepository, userRepository)
    const updatedNote: NoteData = {
      title: "New Title",
      content: "New Content",
      ownerEmail: "any@mail.com",
    }
    const result = await updateNote.perform("0", "any@mail.com", updatedNote)
    const notes = await noteRepository.findAllNotesFromUser(
      aNote.ownerId as string
    )
    expect(notes).toEqual([{ ...updatedNote, id: "0", ownerId: "0" }])
    expect(result.value).toBeTruthy()
  })
})
