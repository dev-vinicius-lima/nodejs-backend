import { Router } from "express"
import UserController from "./controllers/UserController"

const routes = Router()

routes.post("/user", UserController.createUser)
routes.get("/user", UserController.getAllUsers)

export default routes
