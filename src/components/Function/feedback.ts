import { message } from "antd"

export const success = (event: string) => {
  return message.success(`${event} Successfully`)
}

export const error = (e: Error) => {
  return message.error(e.message)
}