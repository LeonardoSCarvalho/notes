import { Either, left, right } from "@/shared/either"
import { Email } from "./email"
import { InvalidEmailError } from "./errors/invalid-email-error"
import { InvalidPasswordError } from "./errors/invalid-password-error"
import { Password } from "./password"
import { UserData } from "./user-data"

export class User {
  private constructor(public readonly email: Email) {}
  public static create(
    userData: UserData
  ): Either<InvalidEmailError | InvalidPasswordError, User> {
    const emailOrError = Email.create(userData.email)
    const passwordOrError = Password.create(userData.password)
    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError())
    }
    if (passwordOrError.isLeft()) {
      return left(new InvalidPasswordError())
    }
    const email = emailOrError.value as Email
    return right(new User(email))
  }
}
