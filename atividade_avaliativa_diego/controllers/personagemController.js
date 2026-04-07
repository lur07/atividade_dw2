import express from "express";
const router = express.Router();

// Dados inseridos diretamente no controller (como no exemplo do professor)
const personagens = [
  {
    id: "tio-patinhas",
    nome: "Tio Patinhas",
    descricao: "O pato mais rico do mundo, dono da Caixa-Forte em Patópolis.",
    historia: "Tio Patinhas é conhecido por sua fortuna gigantesca e por ser extremamente econômico. Ele vive grandes aventuras em busca de tesouros ao redor do mundo.",
    imagem: "/imgs/personagens/tio-patinhas.png",
    curiosidades: [
      "Seu nome original em inglês é Scrooge McDuck.",
      "Ele ama nadar no dinheiro dentro da Caixa-Forte.",
      "Sempre está em busca de novos tesouros."
    ]
  },
  {
    id: "pato-donald",
    nome: "Pato Donald",
    descricao: "O pato mais famoso da Disney, temperamental e corajoso.",
    historia: "Donald é conhecido por seu jeito explosivo, mas também é muito leal e vive aventuras com seus sobrinhos e amigos em Patópolis.",
    imagem: "/imgs/personagens/pato-donald.png",
    curiosidades: [
      "Donald tem um jeito único de falar.",
      "Apesar de azarado, ele sempre tenta dar a volta por cima.",
      "Ele é tio de Huguinho, Zezinho e Luisinho."
    ]
  },
  {
    id: "huguinho-zezinho-luisinho",
    nome: "Huguinho, Zezinho e Luisinho",
    descricao: "Os sobrinhos inteligentes do Donald, sempre prontos para aventuras.",
    historia: "Os três sobrinhos são muito espertos e costumam ajudar Donald e Tio Patinhas em aventuras. Eles fazem parte dos Escoteiros Mirins.",
    imagem: "/imgs/personagens/sobrinhos.png",
    curiosidades: [
      "Eles usam o Manual do Escoteiro Mirim para resolver quase tudo.",
      "São conhecidos por serem mais responsáveis que o Donald.",
      "Cada um tem uma personalidade diferente."
    ]
  },
  {
    id: "maga-patologica",
    nome: "Maga Patalójika",
    descricao: "A grande inimiga do Tio Patinhas, sempre querendo a moedinha número 1.",
    historia: "Maga Patalójika é uma feiticeira poderosa e vive tentando roubar a moedinha número 1 do Tio Patinhas para criar um amuleto de riqueza infinita.",
    imagem: "/imgs/personagens/maga.png",
    curiosidades: [
      "Ela mora no Vesúvio (um vulcão).",
      "O objetivo dela é pegar a moedinha número 1.",
      "Ela usa magia e feitiços para enganar o Patinhas."
    ]
  },
  {
    id: "irmaos-metralha",
    nome: "Irmãos Metralha",
    descricao: "Os ladrões atrapalhados que vivem tentando roubar o dinheiro do Patinhas.",
    historia: "Os Irmãos Metralha são um grupo de ladrões que vive fazendo planos mirabolantes para roubar a Caixa-Forte do Tio Patinhas.",
    imagem: "/imgs/personagens/metralhas.png",
    curiosidades: [
      "Eles são muitos e quase sempre usam números como identificação.",
      "Apesar de perigosos, geralmente falham de forma engraçada.",
      "A Caixa-Forte do Patinhas é o maior alvo deles."
    ]
  },
  {
    id: "gastao",
    nome: "Gastão",
    descricao: "O primo sortudo do Donald, sempre ganhando tudo sem esforço.",
    historia: "Gastão é famoso por sua sorte inacreditável. Ele vive ganhando concursos, prêmios e tudo acontece ao favor dele.",
    imagem: "/imgs/personagens/gastao.png",
    curiosidades: [
      "Donald morre de inveja da sorte dele.",
      "Ele nunca precisa trabalhar para ganhar dinheiro.",
      "Sua sorte é praticamente sobrenatural."
    ]
  }
];

// ROTA: Listar todos os personagens
router.get("/personagens", function(req, res) {
    res.render("personagens", {
        titulo: "Personagens de Patópolis",
        personagens: personagens
    });
});

// ROTA: Detalhes de um personagem específico
router.get("/personagens/:id", function(req, res) {
    const id = req.params.id;
    const personagem = personagens.find(p => p.id === id);

    if (!personagem) {
        return res.status(404).send("Personagem não encontrado!");
    }

    res.render("detalhes", {
        titulo: personagem.nome,
        personagem: personagem
    });
});

export default router;