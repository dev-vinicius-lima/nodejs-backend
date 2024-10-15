import { Request, Response } from "express"
import UserService from "../services/UserService"

export class UserController {
  createUser = (req: Request, res: Response) => {
    const { name, email } = req.body

    if (!name || !email) {
      res.status(400).json({ message: "Name and email are required" })
      return
    }

    UserService.createUser(name, email)
    res.status(200).json({ message: "User created with success" })
  }

  getAllUsers = (req: Request, res: Response) => {
    const users = UserService.getAllUsers()
    res.status(200).json(users)
  }
}

export default new UserController()
