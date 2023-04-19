export class ExistingTitleError extends Error {
  constructor() {
    super("Note title already exists")
    this.name = "ExistingTitleError"
  }
}
