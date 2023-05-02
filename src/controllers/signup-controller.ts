import { Signup } from "@/application/use-cases/signup"
import { UserData } from "@/entities"
import { HttpResponse } from "./ports"
import { ok } from "./util"

export class SignUpController {
  constructor(private readonly usecase: Signup) {}
  async handle(request: UserData): Promise<HttpResponse | undefined> {
    const response = await this.usecase.perform(request)
    if (response.isRight()) return ok(request)
  }
}
