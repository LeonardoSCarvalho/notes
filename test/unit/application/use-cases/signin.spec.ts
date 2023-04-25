import { Encoder } from "@/application/ports/encoder"
import { UserRepository } from "@/application/ports/user-repository"
import { Signin } from "@/application/use-cases/signin"
import { UserNotExistsError } from "@/entities/errors/user-not-exists-error"
import { WrongPasswordError } from "@/entities/errors/wrong-password-error"
import { FakeEncoder } from "../repositories/fake-encoder"
import { InMemoryUserRepository } from "../repositories/in-memory-user-repository"

describe("Signin use case", () => {
  const userRepository: UserRepository = new InMemoryUserRepository([
    { email: "any@email.com", password: "123any_password" + "ENCRYPTED" },
  ])
  const encoder: Encoder = new FakeEncoder()
  it("Should sign in if the username and password are correct", async () => {
    const usecase = new Signin(userRepository, encoder)
    const result = await usecase.perform({
      email: "any@email.com",
      password: "123any_password",
    })
    expect(result.isRight()).toBeTruthy()
  })
  it("Should not sign in if the email is incorrect", async () => {
    const usecase = new Signin(userRepository, encoder)
    const result = await usecase.perform({
      email: "any@wrong_email.com",
      password: "123any_password",
    })
    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toEqual(new UserNotExistsError())
  })
  it("Should not sign in if the password is incorrect", async () => {
    const usecase = new Signin(userRepository, encoder)
    const result = await usecase.perform({
      email: "any@email.com",
      password: "wrong_password",
    })
    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toEqual(new WrongPasswordError())
  })
})
