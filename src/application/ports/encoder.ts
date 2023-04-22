export interface Encoder {
  encode(value: string): Promise<string>
  cmopare(plain: string, hash: string): Promise<boolean>
}
