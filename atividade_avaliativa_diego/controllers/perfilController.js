import express from "express";
const router = express.Router();

router.get("/perfil", function(req, res) {
    // Dados organizados para a tabela
    const dadosPerfil = [
        { label: "Nome", valor: "Lucas Rodrigues Ferreira" },
        { label: "Email", valor: "lucas@email.com" },
        { label: "ID", valor: "0001" },
        { label: "Tipo de conta", valor: "Visitante" },
        { label: "Personagem favorito", valor: "Tio Patinhas" }
    ];

    res.render("perfil", {
        titulo: "Perfil",
        perfil: dadosPerfil // Enviando o array para a view
    });
});

export default router;