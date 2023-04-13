import { Either, left, right } from "@/shared/either"
import { Email } from "./email"
import { InvalidEmailError } from "./errors/invalid-email-error"
import { InvalidPasswordError } from "./errors/invalid-password-error"
import { Password } from "./password"
import { UserData } from "./user-data"

export class User {
  private constructor(
    private readonly _email: Email,
    private readonly _password: Password
  ) {
    Object.freeze(this)
  }

  public get email(): Email {
    return this._email
  }
  get password(): Password {
    return this._password
  }
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
    const password = passwordOrError.value as Password
    return right(new User(email, password))
  }
}
