import { Encoder, UserRepository } from "@/application/ports/"
import { Signin } from "@/application/use-cases/signin"
import { UserNotExistsError, WrongPasswordError } from "@/entities/errors/"
import { UserData } from "@/entities/user-data"
import { FakeEncoder, InMemoryUserRepository } from "../repositories/"
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
