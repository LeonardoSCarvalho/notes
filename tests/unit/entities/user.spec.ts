import { InvalidEmailError } from "@/entities/errors/invalid-email-error"
import { User } from "@/entities/user"
import { left } from "@/shared/either"

describe("User domain entity", () => {
  it("Should not create user with invalid e-mail address", () => {
    const invalidEmail = "invalid_email"
    const error = User.create({ email: invalidEmail })
    expect(error).toEqual(left(new InvalidEmailError()))
  })
})
