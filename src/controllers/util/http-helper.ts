import { HttpResponse } from "../ports"

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
})
