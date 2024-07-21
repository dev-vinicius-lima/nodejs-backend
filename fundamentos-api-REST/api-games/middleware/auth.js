import { jwtSecret } from '../app.js'
import jwt from "jsonwebtoken"
function auth(req, res, next) {
  const authToken = req.headers["authorization"]

  if (!authToken) {
    return res.status(401).json({ message: "Token inválido!" })
  }

  const token = authToken.split(" ")[1]
  jwt.verify(token, jwtSecret, (error, data) => {
    if (error) {
      return res.status(401).json({ message: "Token inválido!" })
    }
    req.token = token
    req.loggedUser = {
      id: data.id,
      email: data.user
    }
    next()
  })

}

export default auth