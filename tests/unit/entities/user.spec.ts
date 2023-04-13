import { InvalidEmailError } from "@/entities/errors/invalid-email-error"
import { InvalidPasswordError } from "@/entities/errors/invalid-password-error"
import { User } from "@/entities/user"
import { left } from "@/shared/either"

describe("User domain entity", () => {
  it("Should not create user with invalid e-mail address", () => {
    const invalidEmail = "invalid_email"
    const validPassword = "123any-password"
    const error = User.create({ email: invalidEmail, password: validPassword })
    expect(error).toEqual(left(new InvalidEmailError()))
  })

  it("Should not create user with invalid password (less than 6 characters)", () => {
    const validEmail = "any@email.com"
    const invalidPassword = "123ac"
    const error = User.create({ email: validEmail, password: invalidPassword })
    expect(error).toEqual(left(new InvalidPasswordError()))
  })

  it("Should not create user with invalid password (without numbers)", () => {
    const validEmail = "any@email.com"
    const invalidPassword = "any-password"
    const error = User.create({ email: validEmail, password: invalidPassword })
    expect(error).toEqual(left(new InvalidPasswordError()))
  })

  it("Should create user with valid email address and password", () => {
    const validEmail = "any-email@email.com"
    const validPassword = "123any-password"
    const user: User = User.create({
      email: validEmail,
      password: validPassword,
    }).value as User
    expect(user.email.value).toEqual(validEmail)
  })
})
