import { UserData } from "@/entities/user-data"

export class UserBuilder {
  private user: UserData = { email: "any@mail.com", password: "1validpassword" }

  public static aUser(): UserBuilder {
    return new UserBuilder()
  }

  public withInvalidEmail(): UserBuilder {
    this.user.email = "invalid_email"
    return this
  }

  public withInvalidPassword(): UserBuilder {
    this.user.password = "123"
    return this
  }

  public build(): UserData {
    return this.user
  }
}
