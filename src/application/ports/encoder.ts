export interface Encoder {
  encode(value: string): Promise<string>
  compare(plain: string, hash: string): Promise<boolean>
}
