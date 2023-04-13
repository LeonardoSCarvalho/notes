import { Either, left, right } from "@/shared/either"
import { InvalidPasswordError } from "./errors/invalid-password-error"

export class Password {
  constructor(private readonly _value: string) {}

  public get value(): string {
    return this._value
  }

  public static create(
    password: string
  ): Either<InvalidPasswordError, Password> {
    if (!Password.validate(password)) return left(new InvalidPasswordError())
    return right(new Password(password))
  }

  public static validate(password: string): boolean {
    if (!password) return false
    if (password.length < 6) return false
    if (!Password.hasNumber(password)) return false
    return true
  }

  private static hasNumber(str: string) {
    return /\d/.test(str)
  }
}
