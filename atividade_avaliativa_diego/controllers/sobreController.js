// 1. Importando o Express
import express from "express";

// 2. Criando o Router
const router = express.Router();

// 3. Definindo a rota "/sobre"
router.get("/sobre", function(req, res) {
    res.render("sobre", { 
        titulo: "Sobre" 
    });
});

// 4. Exportando o router (Padrão ES6)
export default router;