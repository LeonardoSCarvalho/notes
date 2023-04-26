import { Encoder } from "@/application/ports/encoder"
import { UserRepository } from "@/application/ports/user-repository"
import { Signup } from "@/application/use-cases/signup"
import { ExistingUserError } from "@/entities/errors/existing-user-error"
import { InvalidEmailError } from "@/entities/errors/invalid-email-error"
import { InvalidPasswordError } from "@/entities/errors/invalid-password-error"
import { UserData } from "@/entities/user-data"
import { FakeEncoder } from "../repositories/fake-encoder"
import { InMemoryUserRepository } from "../repositories/in-memory-user-repository"
import { UserBuilder } from "./builders/user-builder"
describe("Signup use case", () => {
  it("Should signup user with valid data", async () => {
    const userRepository: UserRepository = new InMemoryUserRepository([])
    const encoder: Encoder = new FakeEncoder()
    const usecase: Signup = new Signup(userRepository, encoder)
    const validUserSignUpRequest = UserBuilder.aUser().build()
    const userSignupResponse = await usecase.perform(validUserSignUpRequest)
    expect(userSignupResponse.isRight()).toBeTruthy()
    expect((await userRepository.findAllUsers()).length).toEqual(1)
    expect(
      (await userRepository.findByEmail(validUserSignUpRequest.email))?.password
    ).toEqual(validUserSignUpRequest.password + "ENCRYPTED")
  })
  it("Should not signup if user already exists", async () => {
    const validUserSignUpRequest: UserData = UserBuilder.aUser().build()
    const userRepository: UserRepository = new InMemoryUserRepository([
      { ...validUserSignUpRequest },
    ])
    const encoder: Encoder = new FakeEncoder()
    const usecase: Signup = new Signup(userRepository, encoder)
    const userSignupResponse = await usecase.perform(validUserSignUpRequest)
    expect(userSignupResponse.isLeft()).toBeTruthy()
    expect(userSignupResponse.value).toEqual(new ExistingUserError())
  })
  it("Should not signup if email is invalid", async () => {
    const userSignUpRequestWithInvalidEmail: UserData = UserBuilder.aUser()
      .withInvalidEmail()
      .build()
    const userRepository: UserRepository = new InMemoryUserRepository([])
    const encoder: Encoder = new FakeEncoder()
    const usecase: Signup = new Signup(userRepository, encoder)
    const userSignupResponse = await usecase.perform(
      userSignUpRequestWithInvalidEmail
    )
    expect(userSignupResponse.isLeft()).toBeTruthy()
    expect(userSignupResponse.value).toEqual(new InvalidEmailError())
  })
  it("Should not signup if password is invalid", async () => {
    const userSignUpRequestWithInvalidPassword: UserData = UserBuilder.aUser()
      .withInvalidPassword()
      .build()
    const userRepository: UserRepository = new InMemoryUserRepository([])
    const encoder: Encoder = new FakeEncoder()
    const usecase: Signup = new Signup(userRepository, encoder)
    const userSignupResponse = await usecase.perform(
      userSignUpRequestWithInvalidPassword
    )
    expect(userSignupResponse.isLeft()).toBeTruthy()
    expect(userSignupResponse.value).toEqual(new InvalidPasswordError())
  })
})
