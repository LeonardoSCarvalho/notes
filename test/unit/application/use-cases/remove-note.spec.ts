import { RemoveNote } from "@/application/use-cases/remove-note"
import { InMemoryNoteRepository } from "../repositories/in-memory-note-repository"
import { NoteBuilder } from "./builders/note-builder"

describe("remove note use case", () => {
  const aNote = NoteBuilder.aNote().build()
  const noteRepository = new InMemoryNoteRepository([aNote])
  it("Should remove a note referring to the id", async () => {
    const usecase: RemoveNote = new RemoveNote(noteRepository)
    await usecase.perform(aNote.id as string)
    const notes = await noteRepository.findAllNotesFromUser(
      aNote.ownerId as string
    )
    expect(notes.length).toEqual(0)
  })
})
