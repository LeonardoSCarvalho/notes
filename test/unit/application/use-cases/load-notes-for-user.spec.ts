import { LoadNotesForUser } from "@/application/use-cases/load-notes-for-user"
import { NoteData } from "@/entities/note-data"
import { InMemoryNoteRepository } from "../repositories/in-memory-note-repository"

describe("Load notes for user", () => {
  const validTitle1 = "any_title1"
  const validContent1 = "any_content1"
  const validTitle2 = "any_title2"
  const validContent2 = "any_content2"
  const validUserID = "0"
  const note1: NoteData = {
    id: "0",
    ownerId: validUserID,
    title: validTitle1,
    content: validContent1,
  }
  const note2: NoteData = {
    id: "1",
    ownerId: validUserID,
    title: validTitle2,
    content: validContent2,
  }
  const noteRepository = new InMemoryNoteRepository([note1, note2])
  it("Should correctly load notes for a registered user", async () => {
    const usecase: LoadNotesForUser = new LoadNotesForUser(noteRepository)
    const result = await usecase.perform(validUserID)
    expect(result).toEqual([note1, note2])
    expect(result.length).toEqual(2)
  })

  it("Should fail to load notes for user without notes", async () => {
    const usecase: LoadNotesForUser = new LoadNotesForUser(noteRepository)
    const notes: NoteData[] = await usecase.perform("1")
    expect(notes.length).toEqual(0)
  })
})
