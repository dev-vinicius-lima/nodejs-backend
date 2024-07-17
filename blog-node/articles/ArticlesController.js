import express from "express";
import Article from "./Article.js";
import slugify from "slugify";
import Category from "../categories/Category.js";
const router = express.Router();

router.get("/admin/articles", (req, res) => {
  Article.findAll({
    include: [{ model: Category }]
  }).then(articles => {
    res.render("admin/articles/index", { articles })
  })
})

router.get("/admin/articles/new", (req, res) => {
  Category.findAll().then(categories => {
    res.render("admin/articles/new", { categories })
  })
})

router.post("/articles/save", (req, res) => {
  const { title, body, category } = req.body
  console.log(category)
  Article.create({
    title,
    slug: slugify(title),
    body,
    categoryId: category
  }).then(() => {
    res.redirect("/admin/articles")
  })
})

router.post("/articles/delete", (req, res) => {
  const { id } = req.body
  if (id !== undefined) {
    if (!isNaN(id)) {
      Article.destroy({
        where: {
          id
        }
      }).then(() => {
        res.redirect("/admin/articles")
      })

    } else {
      res.redirect("/admin/articles")
    }

  } else {
    res.redirect("/admin/articles")
  }

})

export default router;