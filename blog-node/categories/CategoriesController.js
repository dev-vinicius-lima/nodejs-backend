import express from "express";
import Category from "./Category.js";
import slugify from "slugify";
const router = express.Router();

router.get("/admin/categories/new", (req, res) => {
  res.render("admin/categories/new")
})

router.post("/categories/save", (req, res) => {
  const { title } = req.body
  if (title !== undefined) {
    Category.count({ where: { title: title } }).then(count => {
      if (count == 0) {
        Category.create({ title, slug: slugify(title) }).then(() => {
          res.redirect("/admin/categories")
        })
      }
      else {
        res.redirect("/admin/categories/new")
      }
    })
  }
})

router.get("/admin/categories", (req, res) => {
  Category.findAll().then(categories => {
    res.render("admin/categories/index", { categories: categories })
  })
})

router.post("/categories/delete", (req, res) => {
  const { id } = req.body
  if (id !== undefined) {
    if (!isNaN(id)) {
      Category.destroy({
        where: {
          id
        }
      }).then(() => {
        res.redirect("/admin/categories")
      })

    } else {
      res.redirect("/admin/categories")
    }

  } else {
    res.redirect("/admin/categories")
  }

})

router.get("/admin/categories/edit/:id", (req, res) => {
  const { id } = req.params

  if (isNaN(id)) {
    res.redirect("/admin/categories")
  }

  Category.findByPk(id).then(category => {
    if (category != undefined) {
      res.render("../views/admin/categories/edit.ejs", { category: category })

    } else {
      res.redirect("/admin/categories")
    }
  }).catch(error => {
    res.redirect("/admin/categories")
  })
})

router.post("/categories/update", (req, res) => {
  const { id, title } = req.body
  Category.update({ title, slug: slugify(title) }, {
    where: {
      id
    }
  }).then(() => {
    res.redirect("/admin/categories")
  })
})


export default router;