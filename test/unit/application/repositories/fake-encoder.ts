import { Encoder } from "@/application/ports/encoder"

export class FakeEncoder implements Encoder {
  public async encode(plain: string): Promise<string> {
    return plain + "ENCRYPTED"
  }
}
