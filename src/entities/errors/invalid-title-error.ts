export class InvalidTitleError extends Error {
  constructor() {
    super(`The title is invalid.`)
    this.name = `InvalidTitleError`
  }
}
