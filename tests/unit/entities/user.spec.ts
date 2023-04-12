import { InvalidEmailError } from "@/entities/errors/invalid-email-error"
import { User } from "@/entities/user"
import { left } from "@/shared/either"

describe("User domain entity", () => {
  it("Should not create user with invalid e-mail address", () => {
    const invalidEmail = "invalid_email"
    const error = User.create({ email: invalidEmail })
    expect(error).toEqual(left(new InvalidEmailError()))
  })
  it("Should create user with valid email address", () => {
    const validEmail = "any-email@email.com"
    const user: User = User.create({ email: validEmail }).value as User
    expect(user.email.email).toEqual(validEmail)
  })
})
