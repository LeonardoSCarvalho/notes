import { Encoder } from "@/application/ports/encoder"

export class FakeEncoder implements Encoder {
  public encode(plain: string): string {
    return plain + "ENCRYPTED"
  }
}
