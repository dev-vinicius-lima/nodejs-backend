import express from "express";
const router = express.Router();

router.get("/articles", (req, res) => {
  res.send("rota de ARTICLES")
})

router.get("/admin/articles/new", (req, res) => {
  res.send("rota para criar um novo artigo")
})

export default router;