import express from "express";
const router = express.Router();

// Rota para a página de Perfil do Usuário
router.get("/perfil", (req, res) => {
    // Dados do perfil do usuário para exibir na tela de forma dinâmica
    const usuarioLogado = {
        nome: "Lucas Rodrigues Ferreira",
        cargo: "Editor-Chefe de Patópolis",
        cadastro: "Maio de 2026",
        status: "Ativo"
    };

    res.render("perfil", {
        usuario: usuarioLogado,
        titulo: "Perfil - Patópolis Wiki"
    });
});

export default router;