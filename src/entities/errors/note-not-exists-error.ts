export class NoteNotExistsError extends Error {
  constructor() {
    super("Note does not exists")
    this.name = "NoteNotExistsError"
  }
}
