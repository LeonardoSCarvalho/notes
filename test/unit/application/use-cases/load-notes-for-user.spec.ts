import { LoadNotesForUser } from "@/application/use-cases/load-notes-for-user"
import { NoteData } from "@/entities/note-data"
import { InMemoryNoteRepository } from "../repositories/in-memory-note-repository"
import { NoteBuilder } from "./builders/note-builder"

describe("Load notes for user", () => {
  const note1: NoteData = NoteBuilder.aNote().build()
  const note2: NoteData = NoteBuilder.aNote().withDifferentTitleAndId().build()

  const noteRepository = new InMemoryNoteRepository([note1, note2])
  it("Should correctly load notes for a registered user", async () => {
    const usecase: LoadNotesForUser = new LoadNotesForUser(noteRepository)
    const result = await usecase.perform(note1.ownerId as string)
    expect(result).toEqual([note1, note2])
    expect(result.length).toEqual(2)
  })

  it("Should fail to load notes for user without notes", async () => {
    const usecase: LoadNotesForUser = new LoadNotesForUser(noteRepository)
    const notes: NoteData[] = await usecase.perform("1")
    expect(notes.length).toEqual(0)
  })
})
