import express from "express";
const router = express.Router();

// Importando os modelos do banco de dados de forma explícita
import { Franquia, Personagem, Participacao } from "../config/associations.js";

// 1. ROTA DE LISTAGEM DE GIBIS (Read)
router.get("/franquias", (req, res) => {
    Franquia.findAll().then(franquias => {
        const listaFranquias = franquias.map(f => f.get({ plain: true }));

        res.render("franquias", {
            franquias: listaFranquias,
            titulo: "Lista de Revistas"
        });
    }).catch(error => {
        console.log("Erro ao buscar franquias:", error);
        res.send("Erro ao carregar a página de revistas.");
    });
});

// 2. ROTA DE CADASTRO DE GIBI (Create)
router.post("/franquias/new", (req, res) => {
    const { nome, produtora } = req.body;

    Franquia.create({
        nome: nome,
        produtora: produtora
    }).then(() => {
        res.redirect("/franquias");
    }).catch(error => {
        console.log("Erro ao cadastrar franquia:", error);
        res.send("Erro ao salvar a revista.");
    });
});

// 3. TELA DE EDIÇÃO DO GIBI (Busca os dados atuais)
router.get("/franquias/edit/:id", (req, res) => {
    const id = req.params.id;

    Franquia.findByPk(id).then(franquia => {
        if (franquia) {
            res.render("franquiaEdit", {
                franquia: franquia.get({ plain: true }),
                titulo: "Editar Revista"
            });
        } else {
            res.redirect("/franquias");
        }
    }).catch(error => {
        console.log("Erro ao buscar revista para edição:", error);
        res.redirect("/franquias");
    });
});

// 4. AÇÃO DE SALVAR ALTERAÇÃO DO GIBI (Update)
router.post("/franquias/update", (req, res) => {
    const { id, nome, produtora } = req.body;

    Franquia.update({
        nome: nome,
        produtora: produtora
    }, {
        where: { id: id }
    }).then(() => {
        res.redirect("/franquias");
    }).catch(error => {
        console.log("Erro ao atualizar revista:", error);
        res.send("Erro ao salvar as modificações.");
    });
});

// 5. ROTA DE EXCLUSÃO DE GIBI (Delete)
router.get("/franquias/delete/:id", (req, res) => {
    const id = req.params.id;

    Franquia.destroy({
        where: { id: id }
    }).then(() => {
        res.redirect("/franquias");
    }).catch(error => {
        console.log("Erro ao deletar franquia:", error);
        res.redirect("/franquias");
    });
});

// ==========================================================
// ROTAS PARA O RELACIONAMENTO MUITOS-PARA-MUITOS (VÍNCULOS)
// ==========================================================

// 6. TELA PARA VINCULAR E LISTAR OS VÍNCULOS EXISTENTES (BUSCA SEGURA)
router.get("/franquias/vincular", (req, res) => {
    Personagem.findAll().then(personagens => {
        Franquia.findAll().then(franquias => {
            // Busca os dados puros para evitar o erro de EagerLoadingError do Sequelize
            Participacao.findAll().then(vinculos => {
                
                const listaPersonagens = personagens.map(p => p.get({ plain: true }));
                const listaFranquias = franquias.map(f => f.get({ plain: true }));
                
                // Monta a lista cruzando as IDs manualmente para garantir estabilidade
                const listaVinculos = vinculos.map(v => {
                    const dadosPuros = v.get({ plain: true });
                    
                    const p = listaPersonagens.find(personagem => personagem.id === dadosPuros.personagemId);
                    const f = listaFranquias.find(franquia => franquia.id === dadosPuros.franquiaId);
                    
                    return {
                        personagemId: dadosPuros.personagemId,
                        franquiaId: dadosPuros.franquiaId,
                        nomePersonagem: p ? p.nome : `ID: ${dadosPuros.personagemId}`,
                        nomeFranquia: f ? f.nome : `ID: ${dadosPuros.franquiaId}`
                    };
                });

                res.render("vincular", {
                    personagens: listaPersonagens,
                    franquias: listaFranquias,
                    vinculos: listaVinculos, 
                    titulo: "Vincular a um Gibi"
                });
            });
        });
    }).catch(error => {
        console.log("Erro ao carregar tela de vínculo:", error);
        res.redirect("/franquias");
    });
});

// 7. AÇÃO DE SALVAR O VÍNCULO NO BANCO
router.post("/participacao/save", async (req, res) => {
    const { personagemId, franquiaId } = req.body;

    try {
        await Participacao.create({
            personagemId: Number(personagemId),
            franquiaId: Number(franquiaId)
        });
        res.redirect("/franquias/vincular");
    } catch (error) {
        console.log("Aviso: Vínculo já existente ou erro de validação.");
        res.redirect("/franquias/vincular");
    }
});

export default router;