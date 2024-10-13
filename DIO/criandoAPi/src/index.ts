import "dotenv/config"
import express, { Application, Request, Response } from "express"

const port = process.env.PORT
const server: Application = express()
server.use(express.json())

server.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World" })
})

server.post("/user", (req: Request, res: Response) => {
  const { name } = req.body
  res.status(200).json({ message: `Usuário Criado! com o nome: ${name}` })
})

server.listen(3333, () => console.log(`server running on port ${port} `))
