const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "devviniciuslima",
  database: "nodeMySqlMB"
})
const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(express.json());


conn.connect((err) => {
  if (err) {
    console.log(err)

  }
  console.log("Conectado ao MySQL")

})


app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home")
})

app.get("/books", (req, res) => {
  const sql = "SELECT * FROM books"
  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    const books = data
    console.log(books)
    res.render("books", { books })
  })
})

app.post("/books/insertbook", (req, res) => {
  const title = req.body.title
  const pagesqty = req.body.pagesqty

  const sql = `INSERT INTO books(title, pagesqty) VALUES ('${title}', '${pagesqty}')`
  conn.query(sql, (err) => {
    console.log(err)
  })
  console.log("Livro Cadastrado com sucesso!")

  res.redirect("/books")
})


app.listen(3333, () => {
  console.log("Servidor rodando na porta 3333")
})