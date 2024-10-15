import "dotenv/config"
import express from "express"
import routes from "./routes"

const port = process.env.PORT
const server = express()

server.use(express.json())
server.use(routes)

routes.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" })
})

server.listen(3333, () => console.log(`server running on port ${port} `))
