import { Either, left, right } from "@/shared/either"
import { InvalidTitleError } from "./errors/invalid-title-error"

export class Title {
  private constructor(public readonly value: string) {
    Object.freeze(this)
  }

  public static create(title: string): Either<InvalidTitleError, Title> {
    if (Title.validate(title)) {
      return right(new Title(title))
    }
    return left(new InvalidTitleError())
  }
  public static validate(title: string): boolean {
    if (!title) return false
    if (title.trim().length < 3 || title.trim().length > 256) return false
    return true
  }
}
