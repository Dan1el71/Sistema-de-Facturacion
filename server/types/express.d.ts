declare namespace Express {
  export interface Request {
    user: {
      _id: number
      role: number
      iat: number
      exp: number
    }
  }
}
