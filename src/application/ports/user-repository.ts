import { UserData } from "@/entities/user-data"

export interface UserRepository {
  findAllUsers(): Promise<UserData[]>
  findUserByEmail(email: string): Promise<UserData | undefined>
  addUser(user: UserData): Promise<UserData>
}
