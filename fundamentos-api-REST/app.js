import express from "express"
import connection from './db.js'


const port = 3333
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())


connection.authenticate().then(() => {
  console.log(`Conectado ao banco de dados...`)
}).catch((error) => {
  console.log(error)
})



app.get("/games", (req, res) => {
  res.json(db.games).status(200, "ok")
})

app.get("/game/:id", (req, res) => {
  const { id } = req.params
  if (isNaN(id)) {
    res.status(400).json({ message: "Id inválido" })
  } else {
    const game = db.games.find((game) => game.id == id)
    game ? res.json(game) : res.status(404).json({ message: "Jogo não encontrado" })
  }
})

app.post("/game", (req, res) => {
  const { name, year, price } = req.body
  if (!name || !year || !price || isNaN(year) || isNaN(price)) {
    res.status(400).json({ message: "Todos os campos são obrigatórios!" })
  }
  const game = {
    id: db.games.length + 1,
    name,
    year,
    price
  }
  db.games.push(game)
  game ? res.status(201).json({ message: "Jogo cadastrado!" }) : res.status(400).json({ message: "Jogo não foi cadastrado!" })
})


app.delete("/game/:id", (req, res) => {
  const { id } = req.params
  if (isNaN(id)) {
    res.status(400).json({ message: "Id inválido!" })
  } else {
    const index = db.games.findIndex((game) => game.id == id)
    if (index == -1) {
      res.status(404).json({ message: "Jogo não encontrado!" })
    } else {
      db.games.splice(index, 1)
      res.status(200).json({ message: "Jogo excluido!" })
    }
  }
})

app.put("/game/:id", (req, res) => {
  const { id } = req.params
  if (isNaN(id)) {
    res.status(400).json({ message: "Id inválido!" })
  } else {
    const game = db.games.find((game) => game.id == id)
    if (!game) {
      res.status(404).json({ message: "Jogo não encontrado!" })
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
      res.status(200).json({ message: "Jogo atualizado!" })
    }
  }
})








app.listen(port, () => console.log(`Servidor rodando na porta => ${port}`))