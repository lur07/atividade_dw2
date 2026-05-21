import express from "express";
const router = express.Router();

// Importando os modelos com seus relacionamentos
import { Personagem, Franquia } from "../config/associations.js";

// 1. LISTAR PERSONAGENS E SEUS VÍNCULOS (Read)
router.get("/personagens", (req, res) => {
    // O 'include' traz automaticamente os gibis vinculados a cada personagem
    Personagem.findAll({
        include: [{ model: Franquia, as: 'franquias' }]
    }).then(personagens => {
        const listaPersonagens = personagens.map(p => p.get({ plain: true }));

        res.render("personagens", {
            personagens: listaPersonagens,
            titulo: "Moradores de Patópolis"
        });
    }).catch(error => {
        console.log("Erro ao buscar personagens e vínculos:", error);
        res.send("Erro ao carregar a lista de personagens.");
    });
});

// 2. CADASTRO DE NOVO PERSONAGEM (Create)
router.post("/personagens/new", (req, res) => {
    const { nome, funcao, raridade } = req.body;

    Personagem.create({
        nome: nome,
        funcao: funcao,
        raridade: raridade
    }).then(() => {
        res.redirect("/personagens");
    }).catch(error => {
        console.log("Erro ao cadastrar personagem:", error);
        res.send("Erro ao salvar o habitante.");
    });
});

// 3. REMOVER PERSONAGEM (Delete)
router.get("/personagens/delete/:id", (req, res) => {
    const id = req.params.id;

    Personagem.destroy({
        where: { id: id }
    }).then(() => {
        res.redirect("/personagens");
    }).catch(error => {
        console.log("Erro ao deletar personagem:", error);
        res.redirect("/personagens");
    });
});

export default router;