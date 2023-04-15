import { Either, left, right } from "@/shared/either"
import { InvalidTitleError } from "./errors/invalid-title-error"
import { Title } from "./title"
import { User } from "./user"

export class Note {
  constructor(
    private readonly _owner: User,
    private readonly _title: Title,
    private readonly _content: string
  ) {
    Object.freeze(this)
  }

  get title(): Title {
    return this._title
  }
  get owner(): User {
    return this._owner
  }
  get content(): string {
    return this._content
  }

  public static create(
    owner: User,
    title: string,
    content: string
  ): Either<InvalidTitleError, Note> {
    const titleOrError = Title.create(title)
    if (titleOrError.isLeft()) return left(titleOrError.value)
    return right(new Note(owner, titleOrError.value, content))
  }
}
