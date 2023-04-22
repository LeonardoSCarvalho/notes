import { Encoder } from "@/application/ports/encoder"

export class FakeEncoder implements Encoder {
  public async encode(plain: string): Promise<string> {
    return plain + "ENCRYPTED"
  }
  public async compare(plain: string, hash: string): Promise<boolean> {
    return plain + "ENCRYPTED" === hash
  }
}
