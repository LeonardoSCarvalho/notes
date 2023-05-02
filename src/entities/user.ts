import { Either, left, right } from "@/shared/either"
import { Email } from "./email"
import { InvalidEmailError, InvalidPasswordError } from "./errors/"
import { Password } from "./password"

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
    email: string,
    password: string
  ): Either<InvalidEmailError | InvalidPasswordError, User> {
    const emailOrError = Email.create(email)
    const passwordOrError = Password.create(password)
    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError())
    }
    if (passwordOrError.isLeft()) {
      return left(new InvalidPasswordError())
    }
    const emailValid = emailOrError.value as Email
    const passwordValid = passwordOrError.value as Password
    return right(new User(emailValid, passwordValid))
  }
}
