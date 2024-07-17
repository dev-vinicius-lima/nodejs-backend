import express from "express";
import Article from "./Article.js";
import slugify from "slugify";
import Category from "../categories/Category.js";
const router = express.Router();

router.get("/admin/articles", (req, res) => {
  res.render("admin/articles/index")
})

router.get("/admin/articles/new", (req, res) => {
  Category.findAll().then(categories => {
    res.render("admin/articles/new", { categories })
  })
})

router.post("/articles/save", (req, res) => {
  const { title, body, category } = req.body

  Article.create({
    title,
    slug: slugify(title),
    body,
    categoryId: category
  }).then(() => {
    res.redirect("/admin/articles")
  })
})

export default router;