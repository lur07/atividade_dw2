import express from "express";
const app = express();

// Importando os controllers (Rotas do sistema)
import personagemController from "./controllers/personagemController.js";
import franquiaController from "./controllers/franquiaController.js";
import sobreController from "./controllers/sobreController.js";
import perfilController from "./controllers/perfilController.js";

// Configuração do motor de visualização (EJS)
app.set("view engine", "ejs");

// Define a pasta de arquivos estáticos (CSS, Imagens, etc.)
app.use(express.static("public"));

// Configuração para ler os dados vindos dos formulários (POST)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ==========================================
// ROTAS DE AUTENTICAÇÃO E HOME (PAINEL DO USUÁRIO)
// ==========================================

// 1. ROTA INICIAL: Tela de Login (Besta de Entrada)
app.get("/", (req, res) => {
    res.render("login", { 
        titulo: "Login - Patópolis Wiki" 
    });
});

// 2. AÇÃO DE LOGIN: Recebe os dados e joga para o painel
app.post("/login", (req, res) => {
    const { usuario, senha } = req.body;
    
    // Simulação simples de entrada: preenchendo os campos o acesso é liberado
    if (usuario && senha) {
        res.redirect("/home");
    } else {
        res.redirect("/");
    }
});

// 3. ROTA DA HOME: Central de comando do catálogo
app.get("/home", (req, res) => {
    res.render("home", { 
        titulo: "Início - Patópolis Wiki" 
    });
});

// ==========================================
// VINCULANDO OS CONTROLLERS EXTERNOS
// ==========================================
app.use("/", personagemController);
app.use("/", franquiaController);
app.use("/", sobreController);
app.use("/", perfilController);

// ==========================================
// INICIALIZAÇÃO DO SERVIDOR
// ==========================================
const PORT = 8080;
app.listen(PORT, (error) => {
    if (error) {
        console.log("Erro ao iniciar o servidor:", error);
    } else {
        console.log(`Servidor rodando com sucesso em http://localhost:${PORT}`);
    }
});