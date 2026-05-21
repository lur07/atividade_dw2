import Sequelize from "sequelize"
import connection from "../config/sequelize.js";

const Franquia = connection.define('franquias', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    produtora: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { timestamps: true })

export default Franquia