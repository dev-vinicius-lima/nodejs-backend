import express from "express"
import session from "express-session"
import flash from "express-flash"

const app = express()
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(flash())


app.get("/", (req, res) => {
  res.render("index")
})

app.post("/form", (req, res) => {
  const { email, nome, pontos } = req.body
  let emailError;
  let nameError;
  let pontosError;
  if (email == undefined || email == "") {
    emailError = "Email obrigatório"
  }
  if (nome == undefined || nome == "") {
    nameError = "Nome obrigatório"
  }
  if (pontos == undefined || pontos < 20) {
    pontosError = "Pontos obrigatórios e maiores que 20"
  }
  if (emailError != undefined || nameError != undefined || pontosError != undefined) {
    res.redirect("/")
  } else {
    res.send("Form enviado")
  }
})

app.listen(3333, () => console.log("Rodando na porta 3333"))