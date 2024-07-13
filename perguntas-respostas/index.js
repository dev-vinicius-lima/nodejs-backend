import express from "express";
import connection from "./database/database.js";
import Pergunta from "./database/Pergunta.js";
import Resposta from "./database/Resposta.js";
const app = express();
const port = 3001;


connection.authenticate().then(
  () => console.log("Conexão do banco feita com sucesso"),
).catch((erro) => console.log("ops... deu erro: " + erro));


app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({ extend: true }))
app.use(express.json())

// rotas
app.get("/", (req, res) => {
  Pergunta.findAll({ raw: true, order: [["id", "DESC"]] }).then((perguntas) => {
    res.render("index", {
      perguntas
    })
  })
})

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
})

app.post("/salvarPergunta", (req, res) => {
  const { title, description } = req.body;
  Pergunta.create({ title, description })
    .then(
      res.redirect("/")
    ).catch((erro) => console.log("ops... deu erro: " + erro));
})

app.get("/pergunta/:id", (req, res) => {
  const { id } = req.params;
  Pergunta.findOne({ where: { id } }).then((pergunta) => {
    if (pergunta) {
      Resposta.findAll({ where: { perguntaId: pergunta.id }, order: [["id", "DESC"]] }).then(resposta => {
        res.render("pergunta", { pergunta, resposta })

      })
    } else {
      res.redirect("/")
    }
  })
})

app.post("/responder", (req, res) => {
  const { body, perguntaId } = req.body;

  Resposta.create({ body, perguntaId }).then(
    res.redirect(`/pergunta/${perguntaId}`)
  )
    .catch((erro) => console.log("ops... deu erro: " + erro));
})


app.listen(port, () => console.log("Rodando na porta " + port));