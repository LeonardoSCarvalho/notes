import { UserNotExistsError } from "@/entities/errors/user-not-exists-error"
import { WrongPasswordError } from "@/entities/errors/wrong-password-error"
import { UserData } from "@/entities/user-data"
import { Either, left, right } from "@/shared/either"
import { Encoder } from "../ports/encoder"
import { UserRepository } from "../ports/user-repository"

export class Signin {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encoder: Encoder
  ) {}

  public async perform(
    signinRequest: UserData
  ): Promise<Either<UserNotExistsError | WrongPasswordError, UserData>> {
    const user = await this.userRepository.findByEmail(signinRequest.email)
    if (!user) return left(new UserNotExistsError())
    const checkPassword = await this.encoder.compare(
      signinRequest.password,
      user.password
    )
    if (!checkPassword) return left(new WrongPasswordError())
    return right(user)
  }
}
