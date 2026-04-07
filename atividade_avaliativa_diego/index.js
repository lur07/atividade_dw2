import express from "express";
import path from "path";

// Importando os Controllers
import PersonagemController from "./controllers/personagemController.js";
import SobreController from "./controllers/sobreController.js";
import PerfilController from "./controllers/perfilController.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views"); // Garante que ele ache a pasta views
app.use(express.static("public"));

// ATIVANDO O USO DAS ROTAS
app.use("/", PersonagemController);
app.use("/", SobreController);
app.use("/", PerfilController);

// ROTA PRINCIPAL
app.get("/", function(req, res) {
    res.render("home", { 
        titulo: "Patópolis Wiki" 
    });
});

// USANDO A PORTA 8080 (Igual ao professor)
const port = 8080; 
app.listen(port, function(erro) {
    if (erro) {
        // Se der erro, ele vai imprimir o motivo real no terminal agora
        console.log("ERRO DETALHADO:", erro); 
    } else {
        console.log(`Servidor iniciado com sucesso em http://localhost:${port}`);
    }
});
