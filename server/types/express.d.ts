declare namespace Express {
  export interface Request {
    user: {
      _id: number
      name: string
      role: number
      iat: number
      exp: number
    }
  }
}
