import express from "express";
const router = express.Router();

router.get("/categories", (req, res) => {
  res.send("rota de Categories")
})

router.get("/admin/categories/new", (req, res) => {
  res.send("rota para criar uma nova Categories")
})


export default router;