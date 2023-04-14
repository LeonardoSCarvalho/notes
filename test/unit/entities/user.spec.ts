import { InvalidEmailError } from "@/entities/errors/invalid-email-error"
import { InvalidPasswordError } from "@/entities/errors/invalid-password-error"
import { User } from "@/entities/user"
import { left } from "@/shared/either"

const makeSut = () => {
  const validEmail = "any-email@email.com"
  const validPassword = "123any-password"
  const invalidEmail = "invalid_email"
  const invalidPasswordWithTooFewCharacters = "123ac"
  const invalidPasswordWithNoNumbers = "invalid"
  const sut = User
  return {
    sut,
    validEmail,
    validPassword,
    invalidEmail,
    invalidPasswordWithTooFewCharacters,
    invalidPasswordWithNoNumbers,
  }
}

describe("User domain entity", () => {
  it("Should not create user with invalid e-mail address", () => {
    const { sut, invalidEmail, validPassword } = makeSut()
    const error = sut.create({ email: invalidEmail, password: validPassword })
    expect(error).toEqual(left(new InvalidEmailError()))
  })

  it("Should not create user with invalid password (less than 6 characters)", () => {
    const { sut, validEmail, invalidPasswordWithTooFewCharacters } = makeSut()
    const error = sut.create({
      email: validEmail,
      password: invalidPasswordWithTooFewCharacters,
    })
    expect(error).toEqual(left(new InvalidPasswordError()))
  })

  it("Should not create user with invalid password (without numbers)", () => {
    const { sut, validEmail, invalidPasswordWithNoNumbers } = makeSut()
    const error = sut.create({
      email: validEmail,
      password: invalidPasswordWithNoNumbers,
    })
    expect(error).toEqual(left(new InvalidPasswordError()))
  })

  it("Should create user with valid email address and password", () => {
    const { sut, validEmail, validPassword } = makeSut()
    const user: User = sut.create({
      email: validEmail,
      password: validPassword,
    }).value as User
    const userEmail = user.email
    const userPassword = user.password
    expect(userEmail.value).toEqual(validEmail)
    expect(userPassword.value).toEqual(validPassword)
  })
})
