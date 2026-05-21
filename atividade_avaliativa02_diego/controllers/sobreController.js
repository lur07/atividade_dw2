import express from "express";
const router = express.Router();

// Rota para a página Sobre
router.get("/sobre", (req, res) => {
    res.render("sobre", {
        titulo: "Sobre - Patópolis Wiki"
    });
});

export default router;