export class UserNotExistsError extends Error {
  constructor() {
    super("User does not exists")
    this.name = "UserNotExistsError"
  }
}
