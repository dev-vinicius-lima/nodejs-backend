import express from "express";
import connection from "./database/database.js";
import CategoriesController from "./categories/CategoriesController.js";
import articlesController from "./articles/ArticlesController.js";

import Category from './categories/Category.js';
import Article from './articles/Article.js';

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

app.use("/", CategoriesController);
app.use("/", articlesController);

app.get("/", (req, res) => {
  Article.findAll({
    order: [
      ["id", "DESC"]
    ],
    limit: 4
  }).then(articles => {
    Category.findAll().then(categories => {
      res.render("index", { articles, categories })
    })
  })
});

app.get("/:slug", (req, res) => {
  const { slug } = req.params
  Article.findOne({
    where: { slug },
    include: [{ model: Category }]
  }).then(article => {
    if (article != undefined) {
      Category.findAll().then(categories => {
        res.render("article", { article, categories })
      })
    } else {
      res.redirect("/")
    }
  }).catch(error => {
    res.redirect("/")
  })
})

app.get("/category/:slug", (req, res) => {
  const { slug } = req.params

  Category.findOne({
    where: { slug },
    include: [{ model: Article }]
  }).then(category => {
    if (category != undefined) {
      Category.findAll().then(categories => {
        res.render("index", { articles: category.articles, categories })
      })
    } else {
      res.redirect("/")
    }
  }).catch(error => {
    res.redirect("/")
  })
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})