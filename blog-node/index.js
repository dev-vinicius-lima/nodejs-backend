import express from "express";
import connection from "./database/database.js";

const app = express();
const port = 3000;


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

connection.authenticate().then(() => {
  console.log("Conectado com o banco de dados")
}).catch((error) => {
  console.log("ococorreu um erro: ", error)
})

app.get("/", (req, res) => {
  res.render("index");
});


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})