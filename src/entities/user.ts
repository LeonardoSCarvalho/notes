import { Either, left, right } from "@/shared/either"
import { Email } from "./email"
import { InvalidEmailError } from "./errors/invalid-email-error"
import { UserData } from "./user-data"

export class User {
  private constructor(public readonly email: Email) {}
  public static create(userData: UserData): Either<InvalidEmailError, User> {
    const emailOrError = Email.create(userData.email)
    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError())
    }
    const email = emailOrError.value as Email
    return right(new User(email))
  }
}
