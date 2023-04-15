export class UnregisteredUserError extends Error {
  constructor() {
    super("Unregistered user")
  }
}
