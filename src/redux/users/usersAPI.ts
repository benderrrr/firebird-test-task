import { IUser } from "./types";

export function getUsersList(): Promise<IUser[]> {
  return fetch('https://jsonplaceholder.typicode.com/users', { method: 'GET' }).then(data => {
    if (data.status !== 200) {
      throw new Error()
    } else {
      return data.json()
    }
  })
}
