import { InvalidTitleError } from "@/entities/errors/invalid-title-error"
import { Title } from "@/entities/title"
import { left } from "@/shared/either"

describe("Title entity", () => {
  it("Should return an InvalidTitleError if title is less than 3", () => {
    const invalidTitle = "ab"
    const error = Title.create(invalidTitle)
    expect(error).toEqual(left(new InvalidTitleError()))
  })
  it("Should return an InvalidTitleError if title is more than 256", () => {
    const invalidTitle = "a".repeat(257)
    const error = Title.create(invalidTitle)
    expect(error).toEqual(left(new InvalidTitleError()))
  })
  it("Should return an InvalidTitleError if title is empty", () => {
    const invalidTitle = ""
    const error = Title.create(invalidTitle)
    expect(error).toEqual(left(new InvalidTitleError()))
  })
})
