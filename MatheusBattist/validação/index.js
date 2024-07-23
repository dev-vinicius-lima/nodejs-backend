import express from "express"
import session from "express-session"
import flash from "express-flash"
import cookieParser from "cookie-parser"

const app = express()
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser('s3cr3t'))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
app.use(flash())


app.get("/", (req, res) => {
  let emailError = req.flash("emailError")
  let nameError = req.flash("nameError");
  let pontosError = req.flash("pontosError");
  emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError
  nameError = (nameError == undefined || nameError.length == 0) ? undefined : nameError
  pontosError = (pontosError == undefined || pontosError.length == 0) ? undefined : pontosError

  res.render("index", { emailError, nameError, pontosError, email: req.flash("email"), nome: req.flash("nome"), pontos: req.flash("pontos") })
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
    req.flash("emailError", emailError)
    req.flash("nameError", nameError)
    req.flash("pontosError", pontosError)

    req.flash("email", email)
    req.flash("nome", nome)
    req.flash("pontos", pontos)
    res.redirect("/")
  } else {
    res.send("Form enviado")
  }
})

app.listen(3333, () => console.log("Rodando na porta 3333"))