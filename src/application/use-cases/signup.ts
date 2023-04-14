import { UserData } from "@/entities/user-data"
import { Encoder } from "../ports/encoder"
import { UserRepository } from "../ports/user-repository"

export class Signup {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encoder: Encoder
  ) {}

  public async perform(userSignupRequest: UserData): Promise<UserData> {
    const encodedPassword = await this.encoder.encode(
      userSignupRequest.password
    )
    this.userRepository.addUser({
      ...userSignupRequest,
      password: encodedPassword,
    })
    return userSignupRequest
  }
}
