import { Encoder } from "@/application/ports/encoder"
import { UserRepository } from "@/application/ports/user-repository"
import { Signin } from "@/application/use-cases/signin"
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
    console.log(result)

    expect(result.isRight()).toBeTruthy()
  })
})
