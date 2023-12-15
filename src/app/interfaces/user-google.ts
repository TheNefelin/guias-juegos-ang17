export interface UserGoogle {
  info: {
    at_hash: string,
    sub: string,
    email: string,
    name: string,
    picture: string,
  },
  token: string
}
