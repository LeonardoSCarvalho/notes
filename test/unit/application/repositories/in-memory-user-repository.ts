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

  async findUserByEmail(email: string): Promise<UserData | null> {
    const found = this.users.find((user) => user.email === email)
    return found || null
  }

  async addUser(user: UserData): Promise<UserData> {
    user.id = this.users.length.toString()
    this.users.push(user)
    return user
  }
}
