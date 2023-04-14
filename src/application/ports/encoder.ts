export interface Encoder {
  encode(value: string): Promise<string>
}
