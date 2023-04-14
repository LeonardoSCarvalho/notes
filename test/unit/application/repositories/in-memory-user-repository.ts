import { UserRepository } from "@/application/ports/user-repository"
import { UserData } from "@/entities/user-data"

export class InMemoryUserRepository implements UserRepository {
  private users: UserData[]

  constructor(users: UserData[]) {
    this.users = users
  }

  async findAllUsers(): Promise<UserData[]> {
    return this.users
  }

  async findUserByEmail(email: string): Promise<UserData | undefined> {
    return this.users.find((user) => user.email === email)
  }

  async addUser(user: UserData): Promise<UserData> {
    this.users.push(user)
    return user
  }
}
