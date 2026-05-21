import Sequelize from "sequelize"
import connection from "../config/sequelize.js";

const Personagem = connection.define('personagens', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    funcao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    raridade: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { timestamps: true })

export default Personagem