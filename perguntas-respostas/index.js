import express from "express";
const app = express();
const port = 3001;

app.set("view engine", "ejs")
app.use(express.static("public"));

app.get("/:nome/:lang", (req, res) => {

  const { nome, lang } = req.params
  const exibirmsg = true

  res.render("index", { nome, lang, exibirmsg });
})


app.listen(port, () => console.log("Rodando na porta " + port));