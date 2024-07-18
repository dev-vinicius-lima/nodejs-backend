import express from "express";
import User from "./User.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.get("/admin/users", (req, res) => {
  User.findAll().then(users => {
    res.render("admin/users/index", { users })
  })
});

router.get("/admin/users/create", (req, res) => {
  res.render("admin/users/create")
})

router.post("/users/create", (req, res) => {
  const { email, password } = req.body

  User.findOne({ ẁhere: email }).then(user => {
    if (user == undefined) {
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt)

      User.create({
        email,
        password: hash
      }).then(() => {
        res.redirect("/admin/users")
      }).catch(error => {
        res.redirect("/admin/users/create")
      })

    } else {
      res.redirect("/admin/users/create")
    }
  })
})

router.get("/login", (req, res) => {
  res.render("admin/users/login")
})

router.post("/authenticate", (req, res) => {
  const { email, password } = req.body
  User.findOne({ where: { email } }).then(user => {
    if (user != undefined) { // se o usuário existir
      const passwordCorrect = bcrypt.compare(password, user.password)
      if (passwordCorrect) { // se a senha estiver correta
        req.session.user = { // cria a sessão
          id: user.id,
          email: user.email
        }
        res.redirect("/admin/articles")
      } else {
        res.redirect("/login")
      }

    } else {
      res.redirect("/login")
    }
  })
})

router.get("/logout", (req, res) => {
  req.session.user = undefined
  res.redirect("/")
})



export default router