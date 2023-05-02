import { User, UserData } from "@/entities/"
import {
  ExistingUserError,
  InvalidEmailError,
  InvalidPasswordError,
} from "@/entities/errors/"
import { Either, left, right } from "@/shared/either"
import { Encoder, UserRepository } from "../ports/"

export class Signup {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encoder: Encoder
  ) {}

  public async perform(
    userSignupRequest: UserData
  ): Promise<
    Either<
      ExistingUserError | InvalidEmailError | InvalidPasswordError,
      UserData
    >
  > {
    const userOrError = User.create(
      userSignupRequest.email,
      userSignupRequest.password
    )
    if (userOrError.isLeft()) return left(userOrError.value)
    const userExists = await this.userRepository.findByEmail(
      userSignupRequest.email
    )
    if (userExists) return left(new ExistingUserError())
    const encodedPassword = await this.encoder.encode(
      userSignupRequest.password
    )

    return right(
      await this.userRepository.addUser({
        ...userSignupRequest,
        password: encodedPassword,
      })
    )
  }
}
