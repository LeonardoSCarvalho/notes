import { Encoder } from "@/application/ports/encoder"
import { UserRepository } from "@/application/ports/user-repository"
import { Signup } from "@/application/use-cases/signup"
import { UserData } from "@/entities/user-data"
import { FakeEncoder } from "../repositories/fake-encoder"
import { InMemoryUserRepository } from "../repositories/in-memory-user-repository"
describe("Signup use case", () => {
  it("Should signup user with valid data", async () => {
    const validEmail = "any@mail.com"
    const validPassword = "123any_password"
    const userSignupRequest: UserData = {
      email: validEmail,
      password: validPassword,
    }
    const userRepository: UserRepository = new InMemoryUserRepository([])
    const encoder: Encoder = new FakeEncoder()
    const usecase: Signup = new Signup(userRepository, encoder)
    const userSignupResponse: UserData = await usecase.perform(
      userSignupRequest
    )
    expect(userSignupResponse).toEqual(userSignupRequest)
    expect((await userRepository.findAllUsers()).length).toEqual(1)
    expect(
      (await userRepository.findUserByEmail(validEmail))?.password
    ).toEqual(validPassword + "ENCRYPTED")
  })
})
