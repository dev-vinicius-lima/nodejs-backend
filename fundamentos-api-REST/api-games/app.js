import express from "express"
import connection from './db.js'
import GameModel from './model/GameModel.js'
import UserModel from './model/UserModel.js'
import cors from 'cors'
import jwt from "jsonwebtoken"
import auth from "./middleware/auth.js"

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlciI6InZpbmljaXVzbGltYWVzQGhvdG1haWwuY29tIiwiaWF0IjoxNzIxNTk2Nzc1LCJleHAiOjE3MjE3Njk1NzV9.adNrZ-FCZD7cQwDGN4Cf6rx42mVgvrpBdSIFsEmb-9M
export const jwtSecret = "s3cr3t"

const port = 3333
const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())



connection.authenticate().then(() => {
  console.log(`Conectado ao banco de dados...`)
}).catch((error) => {
  console.log(error)
})

app.get("/games", auth, async (req, res) => {
  const getAllGames = await GameModel.findAll()
  return res.json(getAllGames).status(200, "ok")
})



app.get("/game/:id", auth, (req, res) => {
  const { id } = req.params
  if (isNaN(id)) {
    res.status(400).json({ message: "Id inválido" })
  } else {
    const game = db.games.find((game) => game.id == id)
    game ? res.json(game) : res.status(404).json({ message: "Jogo não encontrado" })
  }
})

app.post("/game", auth, async (req, res) => {
  const { name, year, price } = req.body
  if (!name || !year || !price || isNaN(year) || isNaN(price)) {
    res.status(400).json({ message: "Todos os campos são obrigatórios!" })
  }

  const newGame = await GameModel.create({ name, year, price })
  newGame ? res.status(201).json({ message: "Jogo cadastrado!", newGame }) : res.status(400).json({ message: "Jogo não foi cadastrado!" })
})


app.delete("/game/:id", auth, async (req, res) => {
  const { id } = req.params
  if (isNaN(id)) {
    return res.status(400).json({ message: "Id inválido!" })
  } else {
    const index = await GameModel.findByPk(id)
    if (index == -1) {
      return res.status(404).json({ message: "Jogo não encontrado!" })
    } else {
      GameModel.destroy({ where: { id } })
      return res.status(200).json({ message: "Jogo excluido!" })
    }
  }
})

app.put("/game/:id", auth, async (req, res) => {
  const { id } = req.params
  if (isNaN(id)) {
    return res.status(400).json({ message: "Id inválido!" })
  } try {
    const game = await GameModel.findByPk(id)
    if (!game) {
      return res.status(404).json({ message: "Jogo não encontrado!" })
    } else {
      const { name, year, price } = req.body
      if (name) {
        game.name = name
      }
      if (year) {
        game.year = year
      }
      if (price) {
        game.price = price
      }

      await game.save()
      await game.reload()
      res.status(200).json({ message: "Jogo atualizado!", game: game.toJSON() })
    }
  }
  catch (error) {
    return res.status(500).json({ message: "Erro ao atualizar jogo", error: error.message });
  }
})

app.post("/auth", async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios!" })
  }
  const user = await UserModel.findOne({ where: { email } })

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado!" })
  }
  if (user.password === password) {
    jwt.sign({ id: user.id, user: user.email }, jwtSecret, { expiresIn: "48h" }, (error, token) => {
      if (error) {
        return res.status(500).json({ message: "Erro ao gerar token!" })
      } else {
        return res.status(200).json({ token })
      }
    })
  } else {
    return res.status(400).json({ message: "Credencial inválida!" })
  }
})






app.listen(port, () => console.log(`Servidor rodando na porta => ${port}`))