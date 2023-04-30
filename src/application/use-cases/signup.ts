import { ExistingUserError } from "@/entities/errors/existing-user-error"
import { InvalidEmailError } from "@/entities/errors/invalid-email-error"
import { InvalidPasswordError } from "@/entities/errors/invalid-password-error"
import { User } from "@/entities/user"
import { UserData } from "@/entities/user-data"
import { Either, left, right } from "@/shared/either"
import { Encoder } from "../ports/encoder"
import { UserRepository } from "../ports/user-repository"

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
