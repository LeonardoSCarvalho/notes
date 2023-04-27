import { Encoder } from "@/application/ports/encoder"
import { UserRepository } from "@/application/ports/user-repository"
import { Signin } from "@/application/use-cases/signin"
import { UserNotExistsError } from "@/entities/errors/user-not-exists-error"
import { WrongPasswordError } from "@/entities/errors/wrong-password-error"
import { UserData } from "@/entities/user-data"
import { FakeEncoder } from "../repositories/fake-encoder"
import { InMemoryUserRepository } from "../repositories/in-memory-user-repository"
import { UserBuilder } from "./builders/user-builder"

describe("Signin use case", () => {
  const aUser = UserBuilder.aUser().build()
  const userDataArrayWithSignleUser: UserData[] = [
    { email: aUser.email, password: aUser.password + "ENCRYPTED" },
  ]
  const userRepository: UserRepository = new InMemoryUserRepository(
    userDataArrayWithSignleUser
  )
  const encoder: Encoder = new FakeEncoder()
  it("Should sign in if the username and password are correct", async () => {
    const usecase = new Signin(userRepository, encoder)
    const result = await usecase.perform(aUser)
    expect(result.isRight()).toBeTruthy()
  })
  it("Should not sign in if the email is incorrect", async () => {
    const requestWithInvalidEmail = UserBuilder.aUser()
      .withInvalidEmail()
      .build()
    const usecase = new Signin(userRepository, encoder)
    const result = await usecase.perform(requestWithInvalidEmail)
    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toEqual(new UserNotExistsError())
  })
  it("Should not sign in if the password is incorrect", async () => {
    const requestWithInvalidPassword = UserBuilder.aUser()
      .withInvalidPassword()
      .build()
    const usecase = new Signin(userRepository, encoder)
    const result = await usecase.perform(requestWithInvalidPassword)
    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toEqual(new WrongPasswordError())
  })
})
