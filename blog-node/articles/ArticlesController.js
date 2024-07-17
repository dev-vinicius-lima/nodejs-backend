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

router.get("/admin/articles/edit/:id", (req, res) => {
  const { id } = req.params
  Article.findByPk(id).then(article => {
    if (article != undefined) {
      Category.findAll().then(categories => {
        res.render("admin/articles/edit", { article: article, categories: categories })
      })
    } else {
      res.redirect("/admin/articles")
    }
  })
})


router.post("/articles/update", (req, res) => {
  const { id, title, body, category } = req.body
  Article.update({ title, body, categoryId: category, slug: slugify(title) }, {
    where: {
      id
    }
  }).then(() => {
    res.redirect("/admin/articles")
  }).catch(error => {
    res.redirect("/admin/articles")
  })
})

// Paginação
router.get("/articles/page/:num", (req, res) => {
  const { num } = req.params
  const offset = (parseInt(num) - 1) * 4
  Article.findAndCountAll({
    limit: 4,
    offset: offset,
    order: [
      ["id", "DESC"]
    ],
  }).then(articles => {
    let next
    if (offset + 4 >= articles.count) {
      next = false
    } else {
      next = true
    }
    const result = {
      page: parseInt(num),
      articles: articles.rows,
      next: next
    }
    Category.findAll().then(categories => {
      res.render("admin/articles/page", { result: result, categories: categories })
    })
  })
})

export default router;