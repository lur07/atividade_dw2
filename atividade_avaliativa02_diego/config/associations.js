// ATENÇÃO: Adicione a linha abaixo para conectar os relacionamentos ao banco correto
import connection from "./sequelize.js";

import Personagem from "../models/Personagem.js";
import Franquia from "../models/Franquia.js";
import Participacao from "../models/Participacao.js";

// Relacionamento Muitos-para-Muitos (BelongsToMany)
// Uma franquia possui vários personagens
Franquia.belongsToMany(Personagem, { 
    through: Participacao, // Define qual tabela serve de união
    foreignKey: 'franquiaId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

// Um personagem pertence a várias franquias
Personagem.belongsToMany(Franquia, { 
    through: Participacao, 
    foreignKey: 'personagemId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

export { Personagem, Franquia, Participacao };