import { RemoveNote } from "@/application/use-cases/remove-note"
import { NoteData } from "@/entities/note-data"
import { InMemoryNoteRepository } from "../repositories/in-memory-note-repository"

describe("remove note use case", () => {
  const validTitle1 = "any_title1"
  const validContent1 = "any_content1"
  const validUserID = "0"
  const validUserEmail = "any@email.com"
  const note1: NoteData = {
    id: "0",
    ownerEmail: validUserEmail,
    ownerId: validUserID,
    title: validTitle1,
    content: validContent1,
  }
  const noteRepository = new InMemoryNoteRepository([note1])
  it("Should remove a note referring to the id", async () => {
    const usecase: RemoveNote = new RemoveNote(noteRepository)
    await usecase.perform("0")
    const notes = await noteRepository.findAllNotesFromUser(validUserID)
    expect(notes.length).toEqual(0)
  })
})
