import { Encoder } from "@/application/ports"
import { Signup } from "@/application/use-cases/signup"
import { SignUpController } from "@/controllers/signup-controller"
import {
  FakeEncoder,
  InMemoryUserRepository,
} from "../application/repositories"
import { UserBuilder } from "../application/use-cases/builders"

describe("Sign up controller", () => {
  it("Should return 200 and registered user when user is successfully signed up", async () => {
    const emptyUserRepository = new InMemoryUserRepository([])
    const encoder: Encoder = new FakeEncoder()
    const usecase = new Signup(emptyUserRepository, encoder)
    const validUserSignUpRequest = UserBuilder.aUser().build()
    const controller = new SignUpController(usecase)
    const response = await controller.handle(validUserSignUpRequest)
    expect(response.statusCode).toBe(200)
  })
})
